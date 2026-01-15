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
                conversion_target_power,
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
                'conversion_target_power': row['conversion_target_power'],
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
    """Импортирует данные из CSV в базу"""
    conn = get_db_connection()
    cur = conn.cursor()
    stats = {"imported": 0, "errors": []}
    
    try:
        for row in rows:
            try:
                # Извлечение данных из CSV
                model_name = row.get('model_name', '').strip()
                series = row.get('series', '').strip()
                body_type = row.get('body_type', '').strip()
                engine_code = row.get('engine_code', '').strip()
                article_code = row.get('article_code', '').strip()
                
                # Стоковые характеристики (Stage 3)
                stock_power = int(row.get('stock_power', 0))
                stock_torque = int(row.get('stock_torque', 0))
                
                # Stage 1
                stage1_power = int(row.get('stage1_power', 0))
                stage1_torque = int(row.get('stage1_torque', 0))
                stage1_price = int(row.get('stage1_price', 30000))
                
                # Stage 2 (опционально)
                stage2_power = row.get('stage2_power')
                stage2_torque = row.get('stage2_torque')
                
                if stage2_power:
                    stage2_power = int(stage2_power)
                if stage2_torque:
                    stage2_torque = int(stage2_torque)
                
                # Статус и конверсия
                status = int(row.get('status', 1))
                conversion_type = row.get('conversion_type', '').strip() or None
                conversion_target_power = row.get('conversion_target_power')
                conversion_price = row.get('conversion_price')
                
                if conversion_target_power:
                    conversion_target_power = int(conversion_target_power)
                if conversion_price:
                    conversion_price = int(conversion_price)
                
                # Вставка или обновление
                cur.execute("""
                    INSERT INTO bmw_chiptuning (
                        model_name, series, body_type, engine_code, article_code,
                        stock_power, stock_torque,
                        stage1_power, stage1_torque, stage1_price,
                        stage2_power, stage2_torque,
                        status, conversion_type, conversion_target_power, conversion_price
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                        conversion_target_power = EXCLUDED.conversion_target_power,
                        conversion_price = EXCLUDED.conversion_price,
                        updated_at = CURRENT_TIMESTAMP
                """, (
                    model_name, series, body_type, engine_code, article_code,
                    stock_power, stock_torque,
                    stage1_power, stage1_torque, stage1_price,
                    stage2_power, stage2_torque,
                    status, conversion_type, conversion_target_power, conversion_price
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
                conversion_target_power = %s,
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
            data.get('conversion_target_power'),
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