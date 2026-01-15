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
    soup = get_soup(url)

    title = soup.find("h1")
    title_text = title.get_text(strip=True) if title else ""
    parts = title_text.split()
    model = " ".join(parts[:3]) if len(parts) >= 3 else title_text
    modification = parts[3] if len(parts) >= 4 else ""

    engine_hp_stock = None
    engine_nm_stock = None
    for t in soup.stripped_strings:
        if "л.с." in t and "Нм" in t:
            nums = [s for s in t.replace("л.с.", "").replace("Нм", "").replace(">", " ").split() if s.isdigit()]
            if len(nums) >= 2:
                engine_hp_stock = int(nums[0])
                engine_nm_stock = int(nums[1])
                break

    rows = []

    for block in soup.find_all(["table", "div"]):
        text = " ".join(block.get_text(" ", strip=True).split())
        if "руб" not in text:
            continue

        stage = None
        for key in ["Reborn Technologies St.1,5", "Reborn Technologies St.1", "Reborn Technologies St.2",
                    "Stage 1,5", "Stage 1", "Stage 2"]:
            if key in text:
                stage = key
                break

        if not stage:
            continue

        pairs = re.findall(r"(\d+)\s*л\.с\.\s*(\d+)\s*Нм", text)
        if not pairs:
            continue

        hp_stock_local, nm_stock_local = pairs[0]
        hp_after, nm_after = pairs[-1]

        hp_stock_local = int(hp_stock_local)
        nm_stock_local = int(nm_stock_local)
        hp_after = int(hp_after)
        nm_after = int(nm_after)

        if engine_hp_stock is None:
            engine_hp_stock = hp_stock_local
        if engine_nm_stock is None:
            engine_nm_stock = nm_stock_local

        hp_gain = hp_after - engine_hp_stock
        nm_gain = nm_after - engine_nm_stock

        price_match = re.search(r"(\d[\d\s]*)\s*руб", text)
        price = None
        if price_match:
            price = int(price_match.group(1).replace(" ", ""))

        rows.append({
            "model": model,
            "modification": modification,
            "engine_hp_stock": engine_hp_stock,
            "engine_nm_stock": engine_nm_stock,
            "stage": stage,
            "hp_after": hp_after,
            "nm_after": nm_after,
            "price": price,
            "hp_gain": hp_gain,
            "nm_gain": nm_gain,
            "url": url
        })

    return rows

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
