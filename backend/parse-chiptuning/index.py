import json
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from typing import Dict, List, Any
import re

BASE = "https://reborn.tech"
START_URL = "https://reborn.tech/chiptuning/BMW/"

headers = {
    "User-Agent": "Mozilla/5.0"
}

def get_soup(url: str):
    r = requests.get(url, headers=headers, timeout=15)
    r.raise_for_status()
    return BeautifulSoup(r.text, "html.parser")

def parse_model_links() -> List[str]:
    soup = get_soup(START_URL)
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if "/chiptuning/BMW/" in href and href.count("/") > 3 and not href.endswith(".jpg"):
            if href.rstrip("/").split("/")[-1] and "_" in href.rstrip("/").split("/")[-1]:
                continue
            full = urljoin(BASE, href)
            links.append(full)
    return sorted(set(links))

def parse_modification_links(model_url: str) -> List[str]:
    soup = get_soup(model_url)
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith("/chiptuning/BMW/") and href.count("/") > 4:
            full = urljoin(BASE, href)
            links.append(full)
    return sorted(set(links))

def parse_mod_page(url: str) -> List[Dict[str, Any]]:
    try:
        soup = get_soup(url)

        title = soup.find("h1")
        title_text = title.get_text(strip=True) if title else ""
        
        title_match = re.search(r"BMW\s+(.+?)\s+(\S+)\s+(\d+)\s+(?:л\.с\.|hp)\s+(\d+)\s+(?:Нм|Nm)", title_text, re.IGNORECASE)
        if not title_match:
            return []
        
        series = title_match.group(1).strip()
        modification = title_match.group(2).strip()
        model = f"BMW {series}"
        engine_hp_stock = int(title_match.group(3))
        engine_nm_stock = int(title_match.group(4))

        rows = []
        
        content_divs = soup.find_all(["div", "section"])

        for block in content_divs:
            text = " ".join(block.get_text(" ", strip=True).split())
            
            if len(text) < 100 or len(text) > 3000 or "руб" not in text:
                continue

            stage_match = re.search(r"(Reborn Technologies St\.[\d,]+|Stage\s*[\d,]+)", text, re.IGNORECASE)
            if not stage_match:
                continue
            
            stage = stage_match.group(1).replace("Reborn Technologies ", "").replace("  ", " ")
            
            stage_idx = text.find(stage)
            stage_text = text[stage_idx:stage_idx+800]
            
            all_powers = re.findall(r"(\d+)\s*(?:л\.с\.|hp)", stage_text, re.IGNORECASE)
            all_torques = re.findall(r"(\d+)\s*(?:Нм|Nm)", stage_text, re.IGNORECASE)
            
            if len(all_powers) < 1 or len(all_torques) < 1:
                continue
            
            hp_values = sorted([int(p) for p in all_powers if int(p) > 50], reverse=True)
            nm_values = sorted([int(t) for t in all_torques if int(t) > 100], reverse=True)
            
            hp_after = hp_values[0] if hp_values and hp_values[0] > engine_hp_stock else None
            nm_after = nm_values[0] if nm_values and nm_values[0] > engine_nm_stock else None
            
            if not hp_after or not nm_after:
                continue

            price_match = re.search(r"(\d{2}[\d\s]{1,})\s*руб", stage_text)
            price = 30000
            if price_match:
                price_str = price_match.group(1).replace(" ", "").strip()
                if price_str.isdigit() and 10000 <= int(price_str) <= 500000:
                    price = int(price_str)

            rows.append({
                "model": model,
                "modification": modification,
                "engine_hp_stock": engine_hp_stock,
                "engine_nm_stock": engine_nm_stock,
                "stage": stage,
                "hp_after": hp_after,
                "nm_after": nm_after,
                "price": price,
                "hp_gain": hp_after - engine_hp_stock,
                "nm_gain": nm_after - engine_nm_stock,
                "url": url
            })
            
            if len(rows) >= 3:
                break

        return rows
    except Exception as e:
        print(f"Error parsing {url}: {e}")
        return []

def handler(event: dict, context) -> dict:
    '''API для парсинга данных чип-тюнинга BMW с reborn.tech'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method == 'GET':
        query_params = event.get('queryStringParameters') or {}
        limit = int(query_params.get('limit', '10'))
        
        all_rows = []
        try:
            model_links = parse_model_links()[:limit]
            
            for m_url in model_links:
                try:
                    mod_links = parse_modification_links(m_url)[:5]
                    for url in mod_links:
                        try:
                            rows = parse_mod_page(url)
                            all_rows.extend(rows)
                        except Exception as e:
                            print(f"Error parsing {url}: {e}")
                            continue
                except Exception as e:
                    print(f"Error parsing model {m_url}: {e}")
                    continue
            
            models_dict: Dict[str, Dict[str, Any]] = {}
            
            for row in all_rows:
                model_name = row['model']
                modification = row['modification']
                
                if not model_name or not modification:
                    continue
                
                series = model_name.split()[-1] if ' ' in model_name else model_name
                
                if model_name not in models_dict:
                    models_dict[model_name] = {
                        'name': ' '.join(model_name.split()[:-1]) if ' ' in model_name else model_name,
                        'series': series,
                        'generation': 'F' if series.startswith(('E', 'F')) else 'G',
                        'engines': {}
                    }
                
                engine_key = modification
                if engine_key not in models_dict[model_name]['engines']:
                    models_dict[model_name]['engines'][engine_key] = {
                        'code': modification.split()[0] if ' ' in modification else modification,
                        'type': 'diesel' if 'd' in modification.lower() else 'petrol',
                        'displacement': '2.0',
                        'modifications': []
                    }
                
                stage_name = row.get('stage', 'Stage 1')
                
                models_dict[model_name]['engines'][engine_key]['modifications'].append({
                    'name': f"{modification} {stage_name}",
                    'powerBefore': int(row.get('engine_hp_stock', 0)),
                    'powerAfter': int(row.get('hp_after', 0)),
                    'torqueBefore': int(row.get('engine_nm_stock', 0)),
                    'torqueAfter': int(row.get('nm_after', 0)),
                    'price': int(row.get('price', 30000))
                })
            
            result = []
            for model_data in models_dict.values():
                model_data['engines'] = list(model_data['engines'].values())
                result.append(model_data)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result)
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': str(e)
                })
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }