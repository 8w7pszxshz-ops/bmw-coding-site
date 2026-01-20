"""
API для получения данных о чип-тюнинге BMW из базы данных
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_cors_headers(origin=None):
    """Возвращает стандартные CORS заголовки"""
    allowed_origins = [
        'https://reborn-bmw.tech',
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ]
    
    # Если origin в списке разрешённых, используем его, иначе *
    allow_origin = '*'
    if origin and origin in allowed_origins:
        allow_origin = origin
    
    return {
        'Access-Control-Allow-Origin': allow_origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'false',
        'Content-Type': 'application/json'
    }

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    headers = event.get('headers', {})
    origin = headers.get('origin') or headers.get('Origin')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': get_cors_headers(origin),
            'body': '',
            'isBase64Encoded': False
        }
    
    # Получаем параметры запроса
    params = event.get('queryStringParameters') or {}
    
    try:
        # Подключение к БД
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Админка - GET запрос с admin=1
        if method == 'GET' and params.get('admin') == '1':
            query = """
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
                    stage_type,
                    is_restyling,
                    status
                FROM t_p937713_bmw_coding_site.bmw_chiptuning
                ORDER BY id
            """
            cursor.execute(query)
            records = cursor.fetchall()
            
            result = []
            for r in records:
                result.append({
                    'id': r['id'],
                    'model_name': r['model_name'],
                    'series': r['series'],
                    'body_type': r['body_type'],
                    'engine_code': r['engine_code'],
                    'article_code': r['article_code'],
                    'stock': {
                        'power': r['stock_power'],
                        'torque': r['stock_torque']
                    },
                    'stage1': {
                        'power': r['stage1_power'],
                        'torque': r['stage1_torque'],
                        'price': r['stage1_price']
                    },
                    'stage2': {
                        'power': r['stage2_power'],
                        'torque': r['stage2_torque']
                    } if r['stage2_power'] and r['stage2_torque'] else None,
                    'stage_type': r['stage_type'],
                    'is_restyling': r['is_restyling'],
                    'status': r['status']
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': get_cors_headers(origin),
                'body': json.dumps(result, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        # POST запросы для админки
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'update':
                record_id = body.get('id')
                data = body.get('data')
                
                query = """
                    UPDATE t_p937713_bmw_coding_site.bmw_chiptuning
                    SET 
                        model_name = %s,
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
                        stage_type = %s,
                        is_restyling = %s,
                        status = %s
                    WHERE id = %s
                """
                cursor.execute(query, (
                    data['model_name'],
                    data['series'],
                    data['body_type'],
                    data['engine_code'],
                    data['article_code'],
                    data['stock_power'],
                    data['stock_torque'],
                    data['stage1_power'],
                    data['stage1_torque'],
                    data['stage1_price'],
                    data['stage2_power'],
                    data['stage2_torque'],
                    data['stage_type'],
                    data['is_restyling'],
                    data['status'],
                    record_id
                ))
                conn.commit()
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': get_cors_headers(origin),
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif action == 'delete':
                record_id = body.get('id')
                query = "DELETE FROM t_p937713_bmw_coding_site.bmw_chiptuning WHERE id = %s"
                cursor.execute(query, (record_id,))
                conn.commit()
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': get_cors_headers(origin),
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif action == 'sync_csv':
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': get_cors_headers(origin),
                    'body': json.dumps({'updated': 0, 'added': 0, 'message': 'Sync not implemented yet'}),
                    'isBase64Encoded': False
                }
        
        # Обычные GET запросы
        action = params.get('action', 'list')
        series = params.get('series', '')
        body_type = params.get('body_type', '')
        
        # Нормализуем название серии: уже приходит в правильном формате из фронтенда
        series_normalized = series
        
        if action == 'bodies':
            # Получить список кузовов для серии
            query = """
                SELECT DISTINCT body_type
                FROM t_p937713_bmw_coding_site.bmw_chiptuning
                WHERE series = %s AND status = 1
                ORDER BY body_type
            """
            cursor.execute(query, (series_normalized,))
            records = cursor.fetchall()
            result = [r['body_type'] for r in records]
            
        elif action == 'engines':
            # Получить список двигателей для серии и кузова
            query = """
                SELECT 
                    model_name,
                    series,
                    body_type,
                    engine_code,
                    stock_power,
                    stock_torque,
                    stage1_power,
                    stage1_torque,
                    stage1_price,
                    stage2_power,
                    stage2_torque,
                    stage_type
                FROM t_p937713_bmw_coding_site.bmw_chiptuning
                WHERE series = %s AND body_type = %s AND status = 1
                ORDER BY stock_power ASC
            """
            cursor.execute(query, (series_normalized, body_type))
            records = cursor.fetchall()
            
            result = []
            for record in records:
                result.append({
                    'model_name': record['model_name'],
                    'series': record['series'],
                    'body_type': record['body_type'],
                    'engine_code': record['engine_code'],
                    'stock': {
                        'power': record['stock_power'],
                        'torque': record['stock_torque']
                    },
                    'stage1': {
                        'power': record['stage1_power'],
                        'torque': record['stage1_torque'],
                        'price': record['stage1_price']
                    },
                    'stage2': {
                        'power': record['stage2_power'],
                        'torque': record['stage2_torque']
                    } if record['stage2_power'] and record['stage2_torque'] else None,
                    'stage_type': record['stage_type']
                })
        else:
            # Список всех серий
            query = """
                SELECT DISTINCT series
                FROM t_p937713_bmw_coding_site.bmw_chiptuning
                WHERE status = 1
                ORDER BY series
            """
            cursor.execute(query)
            records = cursor.fetchall()
            result = [r['series'] for r in records]
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': get_cors_headers(origin),
            'body': json.dumps(result, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': get_cors_headers(origin),
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }