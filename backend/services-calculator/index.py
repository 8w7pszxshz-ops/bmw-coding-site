import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''Калькулятор доступных услуг кодирования на основе VIN автомобиля'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
    
    vin_data = body.get('vinData')
    action = body.get('action', 'get_services')
    
    if not vin_data:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'VIN data required'}),
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if action == 'get_services':
            # Получаем установленные HWEL блоки из VIN данных
            installed_blocks = [block['hwel_code'] for block in vin_data.get('blocks', [])]
            
            # Получаем все услуги из базы
            cur.execute("""
                SELECT 
                    service_code,
                    category,
                    service_name,
                    description,
                    required_hwel_codes,
                    price,
                    duration_minutes,
                    complexity,
                    is_popular
                FROM coding_services
                ORDER BY 
                    CASE category
                        WHEN 'engine' THEN 1
                        WHEN 'transmission' THEN 2
                        WHEN 'multimedia' THEN 3
                        WHEN 'lighting' THEN 4
                        WHEN 'dashboard' THEN 5
                        WHEN 'comfort' THEN 6
                        WHEN 'safety' THEN 7
                    END,
                    is_popular DESC,
                    price DESC
            """)
            
            all_services = [dict(row) for row in cur.fetchall()]
            
            # Фильтруем доступные услуги
            available_services = []
            unavailable_services = []
            
            for service in all_services:
                required = service['required_hwel_codes'] or []
                has_required = any(code in installed_blocks for code in required)
                
                service_dict = dict(service)
                service_dict['is_available'] = has_required
                
                if has_required:
                    available_services.append(service_dict)
                else:
                    service_dict['missing_blocks'] = [code for code in required if code not in installed_blocks]
                    unavailable_services.append(service_dict)
            
            # Группируем по категориям
            categories = {}
            for service in available_services:
                cat = service['category']
                if cat not in categories:
                    categories[cat] = {
                        'name': get_category_name(cat),
                        'services': [],
                        'total_services': 0
                    }
                categories[cat]['services'].append(service)
                categories[cat]['total_services'] += 1
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'vin': vin_data.get('vin'),
                    'vehicle': vin_data.get('vehicle'),
                    'available_services': available_services,
                    'unavailable_services': unavailable_services,
                    'categories': categories,
                    'total_available': len(available_services),
                    'total_unavailable': len(unavailable_services)
                }, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif action == 'calculate_order':
            # Расчет итоговой стоимости выбранных услуг
            selected_codes = body.get('selectedServices', [])
            
            if not selected_codes:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'No services selected'}),
                    'isBase64Encoded': False
                }
            
            placeholders = ','.join(['%s'] * len(selected_codes))
            cur.execute(f"""
                SELECT service_code, service_name, price, duration_minutes, category
                FROM coding_services
                WHERE service_code IN ({placeholders})
            """, selected_codes)
            
            selected_services = [dict(row) for row in cur.fetchall()]
            
            total_price = sum(s['price'] for s in selected_services)
            total_duration = sum(s['duration_minutes'] for s in selected_services)
            
            # Применяем скидку при заказе от 3 услуг
            discount_percent = 0
            if len(selected_services) >= 5:
                discount_percent = 15
            elif len(selected_services) >= 3:
                discount_percent = 10
            
            discount_amount = int(total_price * discount_percent / 100)
            final_price = total_price - discount_amount
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'services': selected_services,
                    'total_price': total_price,
                    'discount_percent': discount_percent,
                    'discount_amount': discount_amount,
                    'final_price': final_price,
                    'total_duration': total_duration,
                    'estimated_hours': round(total_duration / 60, 1)
                }, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif action == 'save_order':
            # Сохранение заказа клиента
            selected_codes = body.get('selectedServices', [])
            client_info = body.get('clientInfo', {})
            
            placeholders = ','.join(['%s'] * len(selected_codes))
            cur.execute(f"""
                SELECT SUM(price) as total, SUM(duration_minutes) as duration
                FROM coding_services
                WHERE service_code IN ({placeholders})
            """, selected_codes)
            
            totals = cur.fetchone()
            
            cur.execute("""
                INSERT INTO client_orders 
                (vin, vehicle_info, selected_services, total_price, total_duration, 
                 client_name, client_phone, client_email, notes)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                vin_data.get('vin'),
                json.dumps(vin_data.get('vehicle')),
                selected_codes,
                totals['total'],
                totals['duration'],
                client_info.get('name'),
                client_info.get('phone'),
                client_info.get('email'),
                client_info.get('notes')
            ))
            
            order_id = cur.fetchone()['id']
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'order_id': order_id,
                    'message': 'Заказ успешно сохранен'
                }, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Internal server error'}),
            'isBase64Encoded': False
        }


def get_category_name(category: str) -> str:
    '''Русские названия категорий'''
    names = {
        'engine': 'Чип-тюнинг двигателя',
        'transmission': 'Прошивка коробки',
        'multimedia': 'Мультимедиа',
        'lighting': 'Освещение',
        'dashboard': 'Приборная панель',
        'comfort': 'Комфорт',
        'safety': 'Безопасность'
    }
    return names.get(category, category)
