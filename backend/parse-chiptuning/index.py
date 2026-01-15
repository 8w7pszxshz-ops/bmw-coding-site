import json
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from typing import Dict, List, Any
import re
import psycopg2
import psycopg2.extras

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

def get_db_connection():
    """Подключение к PostgreSQL"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def get_data_from_db() -> List[Dict[str, Any]]:
    """Получает данные из БД"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    
    try:
        cur.execute("""
            SELECT 
                m.id as model_id, m.name as model_name, m.series, m.generation, m.sort_order,
                e.id as engine_id, e.code as engine_code, e.type as engine_type, 
                e.displacement, e.sort_order as engine_sort,
                mod.id as mod_id, mod.name as mod_name, mod.stage,
                mod.power_before, mod.power_after,
                mod.torque_before, mod.torque_after, mod.price
            FROM bmw_models m
            JOIN bmw_engines e ON e.model_id = m.id
            JOIN bmw_modifications mod ON mod.engine_id = e.id
            ORDER BY m.sort_order, m.series, e.sort_order, e.code, mod.stage
        """)
        
        rows = cur.fetchall()
        models_dict = {}
        
        for row in rows:
            series = row['series']
            if series not in models_dict:
                models_dict[series] = {
                    'name': row['model_name'],
                    'series': series,
                    'generation': row['generation'],
                    'engines': {}
                }
            
            engine_key = f"{row['engine_id']}_{row['engine_code']}"
            if engine_key not in models_dict[series]['engines']:
                models_dict[series]['engines'][engine_key] = {
                    'code': row['engine_code'],
                    'type': row['engine_type'],
                    'displacement': str(row['displacement']),
                    'modifications': []
                }
            
            models_dict[series]['engines'][engine_key]['modifications'].append({
                'id': row['mod_id'],
                'name': row['mod_name'],
                'stage': row['stage'],
                'powerBefore': row['power_before'],
                'powerAfter': row['power_after'],
                'torqueBefore': row['torque_before'],
                'torqueAfter': row['torque_after'],
                'price': row['price']
            })
        
        result = []
        for series_data in models_dict.values():
            series_data['engines'] = list(series_data['engines'].values())
            result.append(series_data)
        
        return result
    finally:
        cur.close()
        conn.close()

def populate_db_from_parser(limit: int = 50) -> Dict[str, Any]:
    """Заполняет БД из парсера"""
    conn = get_db_connection()
    cur = conn.cursor()
    stats = {"models": 0, "engines": 0, "modifications": 0, "errors": []}
    
    try:
        model_links = parse_model_links()[:limit]
        all_rows = []
        
        for m_url in model_links:
            try:
                mod_links = parse_modification_links(m_url)[:5]
                for url in mod_links:
                    try:
                        rows = parse_mod_page(url)
                        all_rows.extend(rows)
                    except Exception as e:
                        stats['errors'].append(f"Parse error {url}: {str(e)}")
            except Exception as e:
                stats['errors'].append(f"Model error {m_url}: {str(e)}")
        
        # Обработка спарсенных данных
        for row in all_rows:
            try:
                model_name = row['model']
                modification = row['modification']
                
                if not model_name or not modification:
                    continue
                
                series_match = re.search(r'([\d]+(?:-series)?[\s_]?[A-Z\d]+)', model_name)
                series = series_match.group(1) if series_match else model_name.replace('BMW ', '')
                
                series_number = re.search(r'(\d+)', series)
                series_num = int(series_number.group(1)) if series_number else 0
                
                generation = 'G' if any(g in series.upper() for g in ['G20', 'G30', 'G01', 'G05', 'G11', 'G14', 'G15', 'G22', 'G42', 'G60', 'G70', 'G80', 'G82', 'G87', 'G90']) else 'F'
                
                display_name = f"{series_num} Series" if series_num < 10 else model_name.replace('BMW ', '')
                
                # Сохранение модели
                cur.execute("""
                    INSERT INTO bmw_models (name, series, generation, sort_order)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (series) DO UPDATE 
                    SET name = EXCLUDED.name, generation = EXCLUDED.generation
                    RETURNING id
                """, (display_name, series, generation, series_num))
                model_id = cur.fetchone()[0]
                stats['models'] += 1
                
                # Сохранение двигателя
                engine_code = modification.split()[0] if ' ' in modification else modification
                engine_type = 'diesel' if 'd' in modification.lower() else 'petrol'
                disp_match = re.search(r'(\d\.\d)', modification)
                displacement = disp_match.group(1) if disp_match else '2.0'
                
                cur.execute("""
                    INSERT INTO bmw_engines (model_id, code, type, displacement, sort_order)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT (model_id, code) DO UPDATE
                    SET type = EXCLUDED.type, displacement = EXCLUDED.displacement
                    RETURNING id
                """, (model_id, engine_code, engine_type, displacement, int(row.get('engine_hp_stock', 0))))
                engine_id = cur.fetchone()[0]
                stats['engines'] += 1
                
                # Сохранение модификации
                stage_name = row.get('stage', 'Stage 1')
                cur.execute("""
                    INSERT INTO bmw_modifications (
                        engine_id, name, stage, 
                        power_before, power_after,
                        torque_before, torque_after, price
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    engine_id,
                    f"{modification} {stage_name}",
                    stage_name,
                    int(row.get('engine_hp_stock', 0)),
                    int(row.get('hp_after', 0)),
                    int(row.get('engine_nm_stock', 0)),
                    int(row.get('nm_after', 0)),
                    int(row.get('price', 30000))
                ))
                stats['modifications'] += 1
                
            except Exception as e:
                stats['errors'].append(f"DB insert error: {str(e)}")
                continue
        
        conn.commit()
        return stats
        
    except Exception as e:
        conn.rollback()
        stats['errors'].append(f"Transaction error: {str(e)}")
        return stats
    finally:
        cur.close()
        conn.close()

def delete_modification(mod_id: int) -> Dict[str, Any]:
    """Удаляет модификацию по ID"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("DELETE FROM bmw_modifications WHERE id = %s", (mod_id,))
        conn.commit()
        
        if cur.rowcount > 0:
            return {"success": True, "message": f"Modification {mod_id} deleted"}
        else:
            return {"success": False, "error": "Modification not found"}
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": str(e)}
    finally:
        cur.close()
        conn.close()

def update_modification(mod_id: int, data: dict) -> Dict[str, Any]:
    """Обновляет данные модификации"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("""
            UPDATE bmw_modifications
            SET name = %s, stage = %s,
                power_before = %s, power_after = %s,
                torque_before = %s, torque_after = %s,
                price = %s
            WHERE id = %s
        """, (
            data.get('mod_name'),
            data.get('stage'),
            data.get('power_before'),
            data.get('power_after'),
            data.get('torque_before'),
            data.get('torque_after'),
            data.get('price'),
            mod_id
        ))
        conn.commit()
        
        if cur.rowcount > 0:
            return {"success": True, "message": f"Modification {mod_id} updated"}
        else:
            return {"success": False, "error": "Modification not found"}
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": str(e)}
    finally:
        cur.close()
        conn.close()

def import_csv_data(rows: list) -> Dict[str, Any]:
    """Импортирует данные из CSV в базу"""
    conn = get_db_connection()
    cur = conn.cursor()
    stats = {"models": 0, "engines": 0, "modifications": 0, "errors": []}
    
    try:
        for row in rows:
            try:
                # Извлечение данных из CSV строки
                model_name = row.get('model_name', '')
                series = row.get('series', '')
                generation = row.get('generation', 'F')
                engine_code = row.get('engine_code', '')
                engine_type = row.get('engine_type', 'petrol')
                displacement = row.get('displacement', '2.0')
                mod_name = row.get('mod_name', '')
                stage = row.get('stage', 'Stage 1')
                
                # Преобразование числовых значений
                power_before = int(row.get('power_before', 0))
                power_after = int(row.get('power_after', 0))
                torque_before = int(row.get('torque_before', 0))
                torque_after = int(row.get('torque_after', 0))
                price = int(row.get('price', 30000))
                
                # Определение sort_order из series
                series_match = re.search(r'(\d+)', series)
                sort_order = int(series_match.group(1)) if series_match else 0
                
                # Вставка модели
                cur.execute("""
                    INSERT INTO bmw_models (name, series, generation, sort_order)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (series) DO UPDATE 
                    SET name = EXCLUDED.name, generation = EXCLUDED.generation
                    RETURNING id
                """, (model_name, series, generation, sort_order))
                model_id = cur.fetchone()[0]
                stats['models'] += 1
                
                # Вставка двигателя
                cur.execute("""
                    INSERT INTO bmw_engines (model_id, code, type, displacement, sort_order)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT (model_id, code) DO UPDATE
                    SET type = EXCLUDED.type, displacement = EXCLUDED.displacement
                    RETURNING id
                """, (model_id, engine_code, engine_type, displacement, power_before))
                engine_id = cur.fetchone()[0]
                stats['engines'] += 1
                
                # Вставка модификации
                cur.execute("""
                    INSERT INTO bmw_modifications (
                        engine_id, name, stage, 
                        power_before, power_after,
                        torque_before, torque_after, price
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, (engine_id, mod_name, stage, power_before, power_after, torque_before, torque_after, price))
                stats['modifications'] += 1
                
            except Exception as e:
                stats['errors'].append(f"Row error: {str(e)}")
                continue
        
        conn.commit()
        return stats
        
    except Exception as e:
        conn.rollback()
        stats['errors'].append(f"Transaction error: {str(e)}")
        return stats
    finally:
        cur.close()
        conn.close()

def handler(event: dict, context) -> dict:
    '''API для работы с базой данных чип-тюнинга BMW'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method == 'GET':
        query_params = event.get('queryStringParameters') or {}
        action = query_params.get('action', 'get_data')
        
        try:
            if action == 'populate':
                limit = int(query_params.get('limit', '50'))
                stats = populate_db_from_parser(limit)
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(stats, ensure_ascii=False)
                }
            else:
                data = get_data_from_db()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(data, ensure_ascii=False)
                }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}, ensure_ascii=False)
            }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'import_csv':
                csv_data = body.get('data', [])
                stats = import_csv_data(csv_data)
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(stats, ensure_ascii=False)
                }
            elif action == 'update':
                mod_id = body.get('id')
                mod_data = body.get('data')
                result = update_modification(mod_id, mod_data)
                return {
                    'statusCode': 200 if result.get('success') else 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(result, ensure_ascii=False)
                }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}, ensure_ascii=False)
            }
    
    if method == 'DELETE':
        try:
            query_params = event.get('queryStringParameters') or {}
            mod_id = query_params.get('id')
            
            if not mod_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing id parameter'}, ensure_ascii=False)
                }
            
            result = delete_modification(int(mod_id))
            return {
                'statusCode': 200 if result.get('success') else 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, ensure_ascii=False)
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}, ensure_ascii=False)
            }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }