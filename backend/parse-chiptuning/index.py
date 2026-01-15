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
                conversion_price
            FROM bmw_chiptuning
            ORDER BY series, body_type, engine_code
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
    stats = {"imported": 0, "errors": []}
    
    try:
        for row in rows:
            try:
                # Новый формат CSV:
                # Модель, Компания прошивки, Stage 1 крутящий момент, Stage 1 мощность,
                # Stage 2 крутящий момент, Stage 2 мощность, Stage 3 крутящий момент, Stage 3 мощность
                
                model_full = row.get('Модель', '').strip()
                company = row.get('Компания прошивки', 'Reborn Technologies').strip()
                
                # Парсинг модели: "2-Series F2x 220i" -> series="2-series", body="F2x", engine="220i"
                parts = model_full.split()
                if len(parts) < 3:
                    stats['errors'].append(f"Invalid model format: {model_full}")
                    continue
                    
                series = parts[0]  # "2-Series"
                body_type = parts[1]  # "F2x"
                engine_code = ' '.join(parts[2:])  # "220i" или "220i → 228i"
                
                # Stage 3 (стоковые характеристики)
                stock_power = int(row.get('Stage 3 мощность', 0))
                stock_torque = int(row.get('Stage 3 крутящий момент', 0))
                
                # Stage 1
                stage1_power = int(row.get('Stage 1 мощность', 0))
                stage1_torque = int(row.get('Stage 1 крутящий момент', 0))
                stage1_price = 30000  # Базовая цена по умолчанию
                
                # Stage 2 (опционально)
                stage2_power_str = row.get('Stage 2 мощность', '').strip()
                stage2_torque_str = row.get('Stage 2 крутящий момент', '').strip()
                
                stage2_power = int(stage2_power_str) if stage2_power_str else None
                stage2_torque = int(stage2_torque_str) if stage2_torque_str else None
                
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
                status = 1
                
                # Вставка или обновление
                cur.execute("""
                    INSERT INTO bmw_chiptuning (
                        model_name, series, body_type, engine_code, article_code,
                        stock_power, stock_torque,
                        stage1_power, stage1_torque, stage1_price,
                        stage2_power, stage2_torque,
                        status, conversion_type, conversion_price
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (series, body_type, engine_code) 
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
                        updated_at = CURRENT_TIMESTAMP
                """, (
                    model_name, series, body_type, engine_code, article_code,
                    stock_power, stock_torque,
                    stage1_power, stage1_torque, stage1_price,
                    stage2_power, stage2_torque,
                    status, conversion_type, conversion_price
                ))
                stats['imported'] += 1
                
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