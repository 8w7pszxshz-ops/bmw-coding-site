from datetime import datetime
import html

def handler(event, context):
    """
    Генерирует YML-фид для Яндекс.Маркет с услугами чип-тюнинга BMW
    """
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    def escape_xml(text):
        """Экранирование специальных символов для XML"""
        return html.escape(str(text), quote=True)
    
    # Данные для фида
    shop_name = "Reborn BMW Саратов"
    shop_url = "https://reborn-bmw.ru/"
    current_date = datetime.now().strftime("%Y-%m-%dT%H:%M:%S+03:00")
    
    # Категории
    categories = [
        {"id": "1", "name": "Чип-тюнинг BMW"},
        {"id": "2", "name": "Кодирование BMW"},
        {"id": "3", "name": "Изготовление ключей BMW"},
        {"id": "4", "name": "Отключение экологии BMW"},
        {"id": "5", "name": "Диагностика BMW"},
    ]
    
    # Офферы
    offers = [
        # Чип-тюнинг
        {
            "id": "chip-stage1-4cyl",
            "name": "Чип-тюнинг BMW Stage 1 (4 цилиндра)",
            "categoryId": "1",
            "price": "35000",
            "description": "Прошивка Stage 1 для 4-цилиндровых двигателей BMW. Прирост мощности 20-25%. Сохранение заводской надёжности. Работа 1-3 часа.",
            "sales_notes": "Саратов, выезд возможен"
        },
        {
            "id": "chip-stage1-6cyl",
            "name": "Чип-тюнинг BMW Stage 1 (6 цилиндров)",
            "categoryId": "1",
            "price": "40000",
            "description": "Прошивка Stage 1 для 6-цилиндровых двигателей BMW (N55, B58 и др.). Прирост до 70 л.с. Проверенные калибровки.",
            "sales_notes": "Саратов, выезд возможен"
        },
        {
            "id": "chip-stage1-v8",
            "name": "Чип-тюнинг BMW Stage 1 (V8)",
            "categoryId": "1",
            "price": "50000",
            "description": "Прошивка Stage 1 для V8 двигателей BMW. Мощный прирост для моделей X5, X6, 7 серии с N63/S63.",
            "sales_notes": "Саратов, выезд возможен"
        },
        {
            "id": "chip-stage1-m",
            "name": "Чип-тюнинг BMW Stage 1 (M-моторы)",
            "categoryId": "1",
            "price": "55000",
            "description": "Прошивка Stage 1 для M-моторов BMW (S55, S58, S63). До +70 л.с. для M3, M4, M5, X5M.",
            "sales_notes": "Саратов, выезд возможен"
        },
        {
            "id": "chip-stage2",
            "name": "Чип-тюнинг BMW Stage 2",
            "categoryId": "1",
            "price": "55000",
            "description": "Прошивка Stage 2 с доработкой впуска/выпуска. Максимальный прирост для подготовленных автомобилей.",
            "sales_notes": "Требуется модернизация железа"
        },
        # Кодирование
        {
            "id": "coding-1",
            "name": "Кодирование BMW — 1 опция",
            "categoryId": "2",
            "price": "3000",
            "description": "Активация одной скрытой функции BMW: отключение Start/Stop, видео в движении, складывание зеркал и другие.",
            "sales_notes": "Саратов, работа 30 минут"
        },
        {
            "id": "coding-5",
            "name": "Кодирование BMW — пакет 5 опций",
            "categoryId": "2",
            "price": "10000",
            "description": "Активация 5 скрытых функций BMW. Популярный выбор для максимального комфорта.",
            "sales_notes": "Саратов, работа 1 час"
        },
        {
            "id": "coding-10",
            "name": "Кодирование BMW — пакет 10 опций",
            "categoryId": "2",
            "price": "15000",
            "description": "Активация 10 скрытых функций BMW. Полное раскрытие возможностей вашего автомобиля.",
            "sales_notes": "Саратов, работа 1-2 часа"
        },
        {
            "id": "coding-max",
            "name": "Кодирование BMW — максимальный пакет",
            "categoryId": "2",
            "price": "20000",
            "description": "Активация всех доступных скрытых функций BMW. Комплексная настройка автомобиля под ваши требования.",
            "sales_notes": "Саратов, работа 2-3 часа"
        },
        # Изготовление ключей
        {
            "id": "key-f-series",
            "name": "Изготовление ключа BMW F серия",
            "categoryId": "3",
            "price": "15000",
            "description": "Изготовление и программирование ключа для BMW F серии (F30, F10, F20 и др.). Работающий ключ за 1 день.",
            "sales_notes": "Саратов, работа 2-4 часа"
        },
        {
            "id": "key-g-series",
            "name": "Изготовление ключа BMW G серия",
            "categoryId": "3",
            "price": "25000",
            "description": "Изготовление и программирование ключа для BMW G серии (G30, G20, G05 и др.). Новейшие технологии.",
            "sales_notes": "Саратов, работа 3-5 часов"
        },
        {
            "id": "digital-key",
            "name": "Digital Key BMW",
            "categoryId": "3",
            "price": "20000",
            "description": "Активация Digital Key для BMW — управление автомобилем со смартфона. Для G серии с поддержкой технологии.",
            "sales_notes": "Саратов, работа 1-2 часа"
        },
        # Отключение экологии
        {
            "id": "eco-egr",
            "name": "Отключение EGR BMW",
            "categoryId": "4",
            "price": "15000",
            "description": "Программное отключение клапана EGR для дизельных BMW. Устранение ошибок, улучшение тяги.",
            "sales_notes": "Саратов, работа 1-2 часа"
        },
        {
            "id": "eco-dpf",
            "name": "Удаление DPF (сажевый фильтр) BMW",
            "categoryId": "4",
            "price": "20000",
            "description": "Программное удаление сажевого фильтра DPF на дизельных BMW. Без регенераций и ошибок.",
            "sales_notes": "Саратов, работа 2-3 часа"
        },
        {
            "id": "eco-adblue",
            "name": "Удаление ADBLUE BMW",
            "categoryId": "4",
            "price": "20000",
            "description": "Программное отключение системы ADBLUE (мочевина) на дизельных BMW. Экономия на обслуживании.",
            "sales_notes": "Саратов, работа 2-3 часа"
        },
        {
            "id": "eco-euro2",
            "name": "Понижение до Евро 2 BMW",
            "categoryId": "4",
            "price": "15000",
            "description": "Понижение экологического класса до Евро 2 для BMW. Возможность заправки низкокачественным топливом.",
            "sales_notes": "Саратов, работа 1-2 часа"
        },
        {
            "id": "eco-complex",
            "name": "Комплекс отключения экологии BMW",
            "categoryId": "4",
            "price": "45000",
            "description": "Комплексное отключение EGR + DPF + ADBLUE + понижение Евро 2. Полное решение экологических проблем дизельных BMW.",
            "sales_notes": "Саратов, работа 4-6 часов"
        },
        # Диагностика
        {
            "id": "diagnostic-basic",
            "name": "Компьютерная диагностика BMW",
            "categoryId": "5",
            "price": "3000",
            "description": "Полная компьютерная диагностика BMW. Считывание ошибок всех блоков, проверка состояния систем.",
            "sales_notes": "Саратов, работа 30-60 минут"
        },
        {
            "id": "diagnostic-extended",
            "name": "Расширенная диагностика BMW",
            "categoryId": "5",
            "price": "5000",
            "description": "Углублённая диагностика BMW с проверкой параметров работы двигателя, подвески, электроники. Подробный отчёт.",
            "sales_notes": "Саратов, работа 1-2 часа"
        },
    ]
    
    # Формирование XML вручную
    lines = []
    lines.append('<?xml version="1.0" encoding="UTF-8"?>')
    lines.append('<!DOCTYPE yml_catalog SYSTEM "shops.dtd">')
    lines.append(f'<yml_catalog date="{current_date}">')
    lines.append('  <shop>')
    lines.append(f'    <name>{escape_xml(shop_name)}</name>')
    lines.append('    <company>Reborn BMW</company>')
    lines.append(f'    <url>{shop_url}</url>')
    lines.append('    <currencies>')
    lines.append('      <currency id="RUB" rate="1"/>')
    lines.append('    </currencies>')
    lines.append('    <categories>')
    
    for cat in categories:
        lines.append(f'      <category id="{cat["id"]}">{escape_xml(cat["name"])}</category>')
    
    lines.append('    </categories>')
    lines.append('    <offers>')
    
    for offer in offers:
        lines.append(f'      <offer id="{offer["id"]}" available="true">')
        lines.append(f'        <name>{escape_xml(offer["name"])}</name>')
        lines.append(f'        <categoryId>{offer["categoryId"]}</categoryId>')
        lines.append(f'        <price>{offer["price"]}</price>')
        lines.append('        <currencyId>RUB</currencyId>')
        lines.append('        <delivery>false</delivery>')
        lines.append(f'        <description>{escape_xml(offer["description"])}</description>')
        lines.append(f'        <sales_notes>{escape_xml(offer["sales_notes"])}</sales_notes>')
        lines.append('      </offer>')
    
    lines.append('    </offers>')
    lines.append('  </shop>')
    lines.append('</yml_catalog>')
    
    xml_content = '\n'.join(lines)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600'
        },
        'body': xml_content
    }
