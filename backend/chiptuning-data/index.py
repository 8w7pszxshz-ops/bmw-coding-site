"""
API для получения данных о чип-тюнинге BMW из базы данных
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    # Получаем параметры запроса
    params = event.get('queryStringParameters') or {}
    action = params.get('action', 'list')  # list, bodies, engines
    series = params.get('series', '')
    body_type = params.get('body_type', '')
    
    try:
        # Подключение к БД
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Нормализуем название серии: "3 SERIES" -> "3-series"
        def normalize_series(s):
            if not s:
                return ''
            s = s.upper().replace(' SERIES', '').strip()
            # Исключения для M и X серий
            if s in ['M2', 'M3', 'M4', 'M5', 'M6', 'M8', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'X3M', 'X4M', 'X5M', 'X6M', 'XM']:
                return s
            return f"{s}-series"
        
        series_normalized = normalize_series(series)
        
        if action == 'bodies':
            # Получить список кузовов для серии
            query = """
                SELECT DISTINCT body_type
                FROM t_p937713_bmw_coding_site.bmw_chiptuning
                WHERE LOWER(series) = LOWER(%s) AND status = 1
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
                WHERE LOWER(series) = LOWER(%s) AND body_type = %s AND status = 1
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
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }