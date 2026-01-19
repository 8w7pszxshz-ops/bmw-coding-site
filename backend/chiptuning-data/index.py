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
    series = params.get('series', '')  # например: "3-series"
    
    try:
        # Подключение к БД
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Нормализуем название серии: "3 SERIES" -> "3-series"
        series_normalized = series.replace(' SERIES', '').lower()
        if series_normalized and not series_normalized.endswith('-series'):
            series_normalized = f"{series_normalized}-series"
        
        # Запрос с фильтром по серии
        if series_normalized:
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
                WHERE LOWER(series) = %s AND status = 1
                ORDER BY stock_power ASC
            """
            cursor.execute(query, (series_normalized,))
        else:
            # Все записи
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
                WHERE status = 1
                ORDER BY series, stock_power ASC
                LIMIT 100
            """
            cursor.execute(query)
        
        records = cursor.fetchall()
        cursor.close()
        conn.close()
        
        # Преобразуем записи в список словарей
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
