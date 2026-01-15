import json
import os
import psycopg2
import psycopg2.extras
from typing import Dict, List, Any

def get_db_connection():
    """Подключение к PostgreSQL"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def get_data_from_db() -> List[Dict[str, Any]]:
    """Получает данные из новой таблицы bmw_chiptuning"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    
    try:
        cur.execute("""
            SELECT 
                id,
                model_name,
                series,
                body_type,
                engine_code,
                article_code,
                stock_power,
                stock_torque,
                stage1_power,
                stage1_torque,
                stage1_price,
                stage2_power,
                stage2_torque,
                status,
                conversion_type,
                conversion_price,
                stage_type,
                is_restyling
            FROM bmw_chiptuning
            WHERE status = 1
            ORDER BY series, body_type, engine_code, stage_type
        """)
        
        rows = cur.fetchall()
        result = []
        
        for row in rows:
            # Вычисляем цену Stage 2 (Stage 1 + 5000₽)
            stage2_price = row['stage1_price'] + 5000 if row['stage2_power'] else None
            
            result.append({
                'id': row['id'],
                'model_name': row['model_name'],
                'series': row['series'],
                'body_type': row['body_type'],
                'engine_code': row['engine_code'],
                'article_code': row['article_code'],
                'status': row['status'],
                'conversion_type': row['conversion_type'],
                'conversion_price': row['conversion_price'],
                'stage_type': row.get('stage_type', 'St.1'),
                'is_restyling': row.get('is_restyling', False),
                'stock': {
                    'power': row['stock_power'],
                    'torque': row['stock_torque']
                },
                'stage1': {
                    'power': row['stage1_power'],
                    'torque': row['stage1_torque'],
                    'price': row['stage1_price'],
                    'power_gain': row['stage1_power'] - row['stock_power'],
                    'torque_gain': row['stage1_torque'] - row['stock_torque']
                },
                'stage2': {
                    'power': row['stage2_power'],
                    'torque': row['stage2_torque'],
                    'price': stage2_price,
                    'power_gain': row['stage2_power'] - row['stock_power'] if row['stage2_power'] else None,
                    'torque_gain': row['stage2_torque'] - row['stock_torque'] if row['stage2_torque'] else None
                } if row['stage2_power'] else None
            })
        
        return result
    finally:
        cur.close()
        conn.close()

def import_csv_data(rows: list) -> Dict[str, Any]:
    """Импортирует данные из CSV в базу (новый формат с русскими названиями)"""
    conn = get_db_connection()
    cur = conn.cursor()
    stats = {"imported": 0, "errors": [], "deleted": 0}
    
    try:
        # Удаляем все старые записи перед импортом
        cur.execute("DELETE FROM bmw_chiptuning")
        stats['deleted'] = cur.rowcount
        
        for row in rows:
            try:
                # Формат CSV: Наименование, Компания, Stage 1 (крутящий момент), Stage 1 (мощность),
                # Статус, Stage 2 (мощность), Stage 2 (крутящий момент), цена
                # Из "Наименование" парсим: "BMW 1-series E8x 116d 115 л.с. 260 Нм"
                
                import re
                
                model_full = row.get('Наименование', '').strip()
                company_raw = row.get('Компания', 'Reborn Technologies').strip()
                
                # Пропускаем Sedox-Performance (загружаем только Reborn Technologies)
                if 'Sedox' in company_raw or 'sedox' in company_raw.lower():
                    continue
                
                # Извлекаем stage_type из компании ("Reborn Technologies St.1" → "St.1")
                stage_match = re.search(r'St\.(\d+)$', company_raw)
                stage_type = f"St.{stage_match.group(1)}" if stage_match else 'St.1'
                
                # Убираем "St.1", "St.2" из компании для хранения
                company = re.sub(r'\s+St\.\d+$', '', company_raw).strip()
                
                if not model_full:
                    continue  # Пустые строки пропускаем БЕЗ ошибки
                
                # Пропускаем строки-заголовки (если наименование = "BMW" без модели)
                if model_full == "BMW" or not model_full.startswith("BMW"):
                    continue  # Заголовки пропускаем БЕЗ ошибки
                
                # Парсинг наименования: "BMW 1-series E8x 116d 115 л.с. 260 Нм"
                # Ищем последние два числа - это сток мощность и момент
                # Поддержка двух вариантов: "Нм" (кириллица) и "НM" (латиница)
                stock_match = re.search(r'(\d+)\s*л\.с\.\s*(\d+)\s*(?:Нм|НM|HM)', model_full, re.IGNORECASE)
                if not stock_match:
                    stats['errors'].append(f"[SKIP] Не найдены стоковые характеристики в: {model_full}")
                    continue
                
                stock_power = int(stock_match.group(1))  # л.с.
                stock_torque = int(stock_match.group(2))  # Нм
                
                # Убираем стоковые характеристики из названия для парсинга модели
                model_clean = model_full[:stock_match.start()].strip()
                
                # Парсинг модели с гибким форматом
                # Варианты:
                # 1. "BMW 1-series E8x 116d" -> series="1-series", body="E8x", engine="116d"
                # 2. "BMW M5 F90" -> series="M5", body="F90", engine="M5"
                # 3. "BMW 520d G60" -> series="5-series", body="G60", engine="520d"
                # 4. "BMW 530e G30 LCI" -> series="5-series", body="G30 LCI", engine="530e"
                
                parts = model_clean.replace('BMW ', '').split()
                
                # Если только 2 части (например "M5 F90", "520d G60", "X7 30d", "X3M F97")
                if len(parts) == 2:
                    # Определяем что есть что по паттернам
                    first_part = parts[0]
                    second_part = parts[1]
                    
                    # Если первая часть = M-модель (M2, M3, M5, etc)
                    if re.match(r'^M\d+$', first_part):
                        series = f"{first_part}"
                        body_type = second_part
                        engine_code = first_part
                    # Если первая часть = X-модель с M (X3M, X4M, X5M, X6M)
                    elif re.match(r'^X\d+M$', first_part):
                        series = first_part
                        body_type = second_part
                        engine_code = first_part
                    # Если первая часть = X-серия (X7, X5, X3) + вторая = engine_code
                    elif re.match(r'^X\d+$', first_part) and re.match(r'^\w+[di]$', second_part):
                        # X7 30d -> series="X7", body="G07" (нужно угадать), engine="30d"
                        # Для X7 предполагаем G07
                        series = first_part
                        if first_part == 'X7':
                            body_type = 'G07'  # X7 всегда G07
                        elif first_part == 'X5':
                            body_type = 'G05'  # X5 последнее поколение G05
                        elif first_part == 'X6':
                            body_type = 'G06'  # X6 последнее поколение G06
                        elif first_part == 'X3':
                            body_type = 'G01'  # X3 последнее поколение G01
                        elif first_part == 'X4':
                            body_type = 'G02'  # X4 последнее поколение G02
                        else:
                            body_type = 'Unknown'
                        engine_code = second_part
                    # Если первая часть = engine_code (520d, 530i, etc)
                    elif re.match(r'^\d{3}[a-z]+', first_part):
                        # Извлекаем серию из engine_code (520d -> 5-series)
                        series_num = first_part[0]  # "5" из "520d"
                        series = f"{series_num}-series"
                        body_type = second_part
                        engine_code = first_part
                    else:
                        stats['errors'].append(f"[SKIP] Неверный формат (2 части): {model_clean}")
                        continue
                
                # Если 3+ части (стандартный формат)
                elif len(parts) >= 3:
                    series = parts[0]  # "1-series"
                    
                    # Проверяем LCI/Rest в следующих частях
                    if len(parts) >= 4 and (parts[2].upper() == 'LCI' or parts[2].lower() == 'rest'):
                        body_type = f"{parts[1]} {parts[2]}"  # "G30 LCI"
                        engine_code = ' '.join(parts[3:]) if len(parts) > 3 else parts[0]
                    else:
                        body_type = parts[1]  # "E8x"
                        engine_code = ' '.join(parts[2:])  # "116d" или "220i → 228i"
                
                # Если только 1 часть (например "XM")
                elif len(parts) == 1:
                    first_part = parts[0]
                    # XM - специальная M-модель
                    if first_part == 'XM':
                        series = 'XM'
                        body_type = 'G09'  # XM это G09
                        engine_code = 'XM'
                    else:
                        stats['errors'].append(f"[SKIP] Неверный формат (1 часть): {model_clean}")
                        continue
                
                else:
                    stats['errors'].append(f"[SKIP] Неверный формат (< 1 части): {model_clean}")
                    continue
                
                # Определяем рестайлинг по наличию LCI или Rest в body_type
                is_restyling = 'LCI' in body_type.upper() or 'REST' in body_type.upper()
                
                # Stage 1 - извлекаем числа из "400 Нм", "180 л.с."
                stage1_torque_str = row.get('Stage 1 (крутящий момент)', '').strip()
                stage1_power_str = row.get('Stage 1 (мощность)', '').strip()
                stage1_price_str = row.get('цена', '').strip()
                
                # Извлекаем только цифры
                stage1_torque_match = re.search(r'(\d+)', stage1_torque_str)
                stage1_power_match = re.search(r'(\d+)', stage1_power_str)
                stage1_price_match = re.search(r'(\d+)', stage1_price_str)
                
                stage1_torque = int(stage1_torque_match.group(1)) if stage1_torque_match else 0
                stage1_power = int(stage1_power_match.group(1)) if stage1_power_match else 0
                stage1_price = int(stage1_price_match.group(1)) if stage1_price_match else 30000
                
                # Если нет Stage 1 данных - пропускаем БЕЗ ошибки
                if not stage1_torque or not stage1_power:
                    continue
                
                # Stage 2 (опционально) - тоже извлекаем числа
                stage2_power_str = row.get('Stage 2 (мощность)', '').strip()
                stage2_torque_str = row.get('Stage 2 (крутящий момент)', '').strip()
                
                stage2_power = None
                stage2_torque = None
                
                if stage2_power_str:
                    stage2_power_match = re.search(r'(\d+)', stage2_power_str)
                    stage2_power = int(stage2_power_match.group(1)) if stage2_power_match else None
                
                if stage2_torque_str:
                    stage2_torque_match = re.search(r'(\d+)', stage2_torque_str)
                    stage2_torque = int(stage2_torque_match.group(1)) if stage2_torque_match else None
                
                # Статус (0 = скрыт, 1 = показывать)
                status_str = row.get('Статус', '1').strip()
                status = int(status_str) if status_str and status_str.isdigit() else 1
                
                # Определение конверсии (если в названии есть стрелка →)
                conversion_type = None
                conversion_price = None
                if '→' in engine_code:
                    parts_conv = engine_code.split('→')
                    target = parts_conv[-1].strip()
                    conversion_type = f"Заводская прошивка {target}"
                    conversion_price = stage1_price
                
                # Генерация полей для базы
                model_name = model_full
                article_code = model_full
                
                # Вставка или обновление (теперь с stage_type и is_restyling)
                cur.execute("""
                    INSERT INTO bmw_chiptuning (
                        model_name, series, body_type, engine_code, article_code,
                        stock_power, stock_torque,
                        stage1_power, stage1_torque, stage1_price,
                        stage2_power, stage2_torque,
                        status, conversion_type, conversion_price, stage_type, is_restyling
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (series, body_type, engine_code, stage_type) 
                    DO UPDATE SET
                        model_name = EXCLUDED.model_name,
                        article_code = EXCLUDED.article_code,
                        stock_power = EXCLUDED.stock_power,
                        stock_torque = EXCLUDED.stock_torque,
                        stage1_power = EXCLUDED.stage1_power,
                        stage1_torque = EXCLUDED.stage1_torque,
                        stage1_price = EXCLUDED.stage1_price,
                        stage2_power = EXCLUDED.stage2_power,
                        stage2_torque = EXCLUDED.stage2_torque,
                        status = EXCLUDED.status,
                        conversion_type = EXCLUDED.conversion_type,
                        conversion_price = EXCLUDED.conversion_price,
                        is_restyling = EXCLUDED.is_restyling,
                        updated_at = CURRENT_TIMESTAMP
                """, (
                    model_name, series, body_type, engine_code, article_code,
                    stock_power, stock_torque,
                    stage1_power, stage1_torque, stage1_price,
                    stage2_power, stage2_torque,
                    status, conversion_type, conversion_price, stage_type, is_restyling
                ))
                stats['imported'] += 1
                
            except Exception as e:
                # Добавляем подробную информацию об ошибке
                row_preview = row.get('Наименование', 'unknown')[:50]
                error_msg = f"Строка '{row_preview}': {str(e)}"
                stats['errors'].append(error_msg)
                print(f"ERROR: {error_msg}")  # Логируем в Cloud Functions
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

def delete_record(record_id: int) -> Dict[str, Any]:
    """Удаляет запись по ID"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("DELETE FROM bmw_chiptuning WHERE id = %s", (record_id,))
        conn.commit()
        
        if cur.rowcount > 0:
            return {"success": True, "message": f"Record {record_id} deleted"}
        else:
            return {"success": False, "error": "Record not found"}
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": str(e)}
    finally:
        cur.close()
        conn.close()

def delete_all_except(keep_ids: list) -> Dict[str, Any]:
    """Удаляет все записи кроме указанных ID"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if not keep_ids:
            cur.execute("DELETE FROM bmw_chiptuning")
        else:
            placeholders = ','.join(['%s'] * len(keep_ids))
            cur.execute(f"DELETE FROM bmw_chiptuning WHERE id NOT IN ({placeholders})", tuple(keep_ids))
        
        deleted_count = cur.rowcount
        conn.commit()
        
        return {"success": True, "message": f"Deleted {deleted_count} records", "deleted": deleted_count}
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": str(e)}
    finally:
        cur.close()
        conn.close()

def update_record(record_id: int, data: dict) -> Dict[str, Any]:
    """Обновляет данные записи"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("""
            UPDATE bmw_chiptuning
            SET model_name = %s,
                series = %s,
                body_type = %s,
                engine_code = %s,
                article_code = %s,
                stock_power = %s,
                stock_torque = %s,
                stage1_power = %s,
                stage1_torque = %s,
                stage1_price = %s,
                stage2_power = %s,
                stage2_torque = %s,
                status = %s,
                conversion_type = %s,
                conversion_price = %s,
                stage_type = %s,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (
            data.get('model_name'),
            data.get('series'),
            data.get('body_type'),
            data.get('engine_code'),
            data.get('article_code'),
            data.get('stock_power'),
            data.get('stock_torque'),
            data.get('stage1_power'),
            data.get('stage1_torque'),
            data.get('stage1_price'),
            data.get('stage2_power'),
            data.get('stage2_torque'),
            data.get('status', 1),
            data.get('conversion_type'),
            data.get('conversion_price'),
            data.get('stage_type', 'St.1'),
            record_id
        ))
        conn.commit()
        
        if cur.rowcount > 0:
            return {"success": True, "message": f"Record {record_id} updated"}
        else:
            return {"success": False, "error": "Record not found"}
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": str(e)}
    finally:
        cur.close()
        conn.close()

def handler(event: dict, context) -> dict:
    '''API для работы с базой данных чип-тюнинга BMW (новая структура)'''
    
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
        try:
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
                record_id = body.get('id')
                record_data = body.get('data')
                result = update_record(record_id, record_data)
                return {
                    'statusCode': 200 if result.get('success') else 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(result, ensure_ascii=False)
                }
            elif action == 'delete_all_except':
                keep_ids = body.get('keep_ids', [])
                result = delete_all_except(keep_ids)
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
            record_id = query_params.get('id')
            
            if not record_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing id parameter'}, ensure_ascii=False)
                }
            
            result = delete_record(int(record_id))
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