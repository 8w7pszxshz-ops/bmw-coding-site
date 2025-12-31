import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''VIN-декодер с анализом HWEL блоков и возможностей кодирования BMW'''
    
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
    
    vin = body.get('vin', '').strip().upper()
    sa_codes = body.get('saCodes', [])  # Массив SA кодов от клиента
    
    if not vin or len(vin) != 17:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'VIN должен содержать 17 символов'}),
            'isBase64Encoded': False
        }
    
    # Базовое декодирование VIN BMW
    vehicle_info = decode_bmw_vin(vin)
    
    # ИМИТАЦИЯ API: Если SA коды не переданы, используем тестовые данные
    if not sa_codes:
        sa_codes = get_mock_sa_codes(vin)
        vehicle_info['mock_data'] = True
    
    # Определяем установленное оборудование по SA кодам
    equipment = parse_sa_codes(sa_codes)
    vehicle_info.update(equipment)
    
    # Получаем HWEL блоки из базы данных
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Получаем возможные блоки для модели и года
        cur.execute("""
            SELECT hwel_code, block_name, description, features, upgrade_options
            FROM hwel_blocks 
            WHERE vehicle_series = %s AND year_from <= %s AND year_to >= %s
            ORDER BY hwel_code
        """, (vehicle_info['series'], vehicle_info['year'], vehicle_info['year']))
        
        all_blocks = [dict(row) for row in cur.fetchall()]
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f'Database error: {str(e)}')
        all_blocks = []
    
    # Фильтруем блоки по реально установленным SA кодам
    installed_blocks = filter_installed_blocks(all_blocks, equipment)
    
    # Анализ возможностей кодирования из БД
    coding_analysis = get_available_coding_from_db(dsn, installed_blocks, equipment)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'vin': vin,
            'vehicle': vehicle_info,
            'equipment': equipment,
            'sa_codes': sa_codes,
            'blocks': installed_blocks,
            'analysis': coding_analysis
        }, ensure_ascii=False),
        'isBase64Encoded': False
    }


def decode_bmw_vin(vin: str) -> dict:
    '''Декодирование VIN BMW'''
    
    # WMI (World Manufacturer Identifier) - первые 3 символа
    wmi = vin[:3]
    
    # VDS (Vehicle Descriptor Section) - символы 4-9
    series_code = vin[3]
    body_type = vin[4]
    engine_code = vin[5:7]
    
    # VIS (Vehicle Identifier Section) - символы 10-17
    model_year_code = vin[9]
    plant_code = vin[10]
    
    # Определение серии BMW
    series_map = {
        'A': '1-Series', 'B': '3-Series', 'C': '5-Series', 'D': '7-Series',
        'E': 'X1', 'F': 'X3', 'G': 'X5', 'H': 'X6', 'K': 'Z4',
        'U': '6-Series', 'V': 'M-Series', 'W': 'i3/i8'
    }
    
    # Определение года (упрощенная версия)
    year_map = {
        'A': 2010, 'B': 2011, 'C': 2012, 'D': 2013, 'E': 2014,
        'F': 2015, 'G': 2016, 'H': 2017, 'J': 2018, 'K': 2019,
        'L': 2020, 'M': 2021, 'N': 2022, 'P': 2023, 'R': 2024, 'S': 2025
    }
    
    series = series_map.get(series_code, 'Unknown')
    year = year_map.get(model_year_code, 2020)
    
    return {
        'vin': vin,
        'manufacturer': 'BMW',
        'series': series,
        'year': year,
        'engine': engine_code,
        'plant': plant_code,
        'wmi': wmi
    }


def get_available_coding_from_db(dsn: str, installed_blocks: list, equipment: dict) -> dict:
    '''Получение доступных кодировок из базы данных (как в калькуляторе)'''
    
    try:
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Получаем список HWEL кодов установленных блоков
        installed_hwel = [block['hwel_code'] for block in installed_blocks]
        
        # Получаем все услуги из БД
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
        available_coding = []
        
        for service in all_services:
            required = service['required_hwel_codes'] or []
            # Услуга доступна, если хотя бы один требуемый блок установлен
            has_required = any(code in installed_hwel for code in required) if required else True
            
            if has_required:
                available_coding.append({
                    'category': get_category_name(service['category']),
                    'name': service['service_name'],
                    'description': service['description'],
                    'price': service['price'],
                    'duration': service['duration_minutes']
                })
        
        cur.close()
        conn.close()
        
        return {
            'available_coding': available_coding,
            'total_available': len(available_coding)
        }
        
    except Exception as e:
        print(f'Database error in get_available_coding_from_db: {str(e)}')
        return {
            'available_coding': [],
            'total_available': 0
        }


def get_category_name(cat: str) -> str:
    '''Возвращает русское название категории'''
    names = {
        'engine': 'Двигатель',
        'transmission': 'Трансмиссия',
        'multimedia': 'Мультимедиа',
        'lighting': 'Освещение',
        'dashboard': 'Приборная панель',
        'comfort': 'Комфорт',
        'safety': 'Безопасность'
    }
    return names.get(cat, cat.capitalize())


def get_mock_sa_codes(vin: str) -> list:
    '''Имитация API - возвращает тестовые SA коды на основе VIN'''
    # Для демонстрации используем реальные SA коды типичного BMW F30 340i 2017
    mock_data = {
        'WBATX71070LB47317': [
            '1CA',  # BMW M Sport package
            '2VB',  # Acoustic comfort glazing
            '302',  # Automatic transmission Steptronic
            '315',  # Tire Pressure Display
            '322',  # Comfort Access
            '430',  # Interior mirror with automatic-dip
            '494',  # Seat heating for driver and front passenger
            '4UR',  # BMW Connected Drive services
            '563',  # Ambient Light
            '609',  # Navigation system Professional (NBT Evo ID6)
            '610',  # Head-Up Display
            '639',  # Harman Kardon surround sound system
            '644',  # BMW Head-Up Display
            '6FL',  # Adaptive LED headlights
            '6WB',  # Rear view camera
            'B58',  # Engine code: B58 3.0L Turbo I6 340 hp
            'ZF8HP', # Transmission: ZF 8HP50 8-speed automatic
        ]
    }
    
    return mock_data.get(vin, ['302', '609', 'B48', 'ZF8HP'])


def parse_sa_codes(sa_codes: list) -> dict:
    '''Парсинг SA кодов в структурированную информацию об оборудовании'''
    
    equipment = {
        'multimedia': {},
        'engine': {},
        'transmission': {},
        'options': []
    }
    
    # База знаний SA кодов
    sa_database = {
        # Мультимедиа системы
        '606': {'category': 'multimedia', 'name': 'NBT Standard', 'hwel': '263B'},
        '609': {'category': 'multimedia', 'name': 'NBT Evo ID6 Navigation Professional', 'hwel': '26BB'},
        '6WB': {'category': 'multimedia', 'name': 'Rear view camera', 'feature': 'camera'},
        '6VC': {'category': 'multimedia', 'name': 'Top view camera', 'feature': 'top_view'},
        
        # Head-Up Display
        '610': {'category': 'multimedia', 'name': 'Head-Up Display', 'hwel': '26F0'},
        '644': {'category': 'multimedia', 'name': 'BMW Head-Up Display', 'hwel': '26F0'},
        
        # Аудиосистемы
        '639': {'category': 'multimedia', 'name': 'Harman Kardon', 'feature': 'premium_audio'},
        '688': {'category': 'multimedia', 'name': 'Bowers & Wilkins', 'feature': 'premium_audio'},
        
        # Двигатели (коды часто идут как текст, не SA коды)
        'B58': {'category': 'engine', 'code': 'B58', 'type': 'B58 3.0L Turbo I6', 'power': 340, 'tunable': True},
        'B48': {'category': 'engine', 'code': 'B48', 'type': 'B48 2.0L Turbo I4', 'power': 252, 'tunable': True},
        'N55': {'category': 'engine', 'code': 'N55', 'type': 'N55 3.0L Turbo I6', 'power': 306, 'tunable': True},
        'S55': {'category': 'engine', 'code': 'S55', 'type': 'S55 3.0L Twin Turbo I6', 'power': 431, 'tunable': True},
        'S58': {'category': 'engine', 'code': 'S58', 'type': 'S58 3.0L Twin Turbo I6', 'power': 503, 'tunable': True},
        'B57': {'category': 'engine', 'code': 'B57', 'type': 'B57 3.0L Diesel I6', 'power': 265, 'tunable': True},
        
        # Коробки передач
        '302': {'category': 'transmission', 'type': 'ZF8HP', 'name': 'ZF 8-speed Automatic', 'tunable': True},
        'ZF8HP': {'category': 'transmission', 'type': 'ZF8HP', 'name': 'ZF 8HP50/70 Automatic', 'tunable': True},
        
        # Опции комфорта
        '322': {'category': 'option', 'name': 'Comfort Access'},
        '1CA': {'category': 'option', 'name': 'M Sport Package'},
        '494': {'category': 'option', 'name': 'Seat Heating'},
        '563': {'category': 'option', 'name': 'Ambient Light'},
        '6FL': {'category': 'option', 'name': 'Adaptive LED Headlights'},
    }
    
    installed_hwel = []
    
    for code in sa_codes:
        code_upper = code.upper()
        if code_upper in sa_database:
            info = sa_database[code_upper]
            
            if info['category'] == 'multimedia':
                equipment['multimedia'][info['name']] = True
                if 'hwel' in info:
                    installed_hwel.append(info['hwel'])
                if 'feature' in info:
                    equipment['multimedia'][info['feature']] = True
            
            elif info['category'] == 'engine':
                equipment['engine'] = {
                    'code': info['code'],
                    'type': info['type'],
                    'power': info['power'],
                    'tunable': info.get('tunable', False)
                }
            
            elif info['category'] == 'transmission':
                equipment['transmission'] = {
                    'type': info['type'],
                    'name': info['name'],
                    'tunable': info.get('tunable', False)
                }
            
            elif info['category'] == 'option':
                equipment['options'].append(info['name'])
    
    equipment['installed_hwel_codes'] = installed_hwel
    
    return equipment


def filter_installed_blocks(all_blocks: list, equipment: dict) -> list:
    '''Фильтрация блоков - возвращает только реально установленные'''
    
    installed_hwel = equipment.get('installed_hwel_codes', [])
    
    if not installed_hwel:
        # Если HWEL коды не определены из SA, возвращаем все возможные
        return all_blocks
    
    # Возвращаем только блоки которые реально установлены
    installed_blocks = [
        block for block in all_blocks 
        if block['hwel_code'] in installed_hwel
    ]
    
    return installed_blocks if installed_blocks else all_blocks
