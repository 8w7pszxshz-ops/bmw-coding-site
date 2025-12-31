import json
import os
import requests

def handler(event: dict, context) -> dict:
    '''API для консультаций по автомобилям через Google AI (Gemini)'''
    
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
    
    api_key = os.environ.get('GOOGLE_AI_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'API key not configured'}),
            'isBase64Encoded': False
        }
    
    body = json.loads(event.get('body', '{}'))
    user_message = body.get('message', '').strip()
    history = body.get('history', [])
    
    if not user_message:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Message is required'}),
            'isBase64Encoded': False
        }
    
    system_context = """Ты — эксперт-консультант автосервиса "Bocha Reborn" со специализацией на чип-тюнинге и диагностике автомобилей.

Твоя задача:
- Давать профессиональные советы по эксплуатации, обслуживанию и ремонту автомобилей
- Объяснять преимущества и особенности чип-тюнинга
- Помогать с диагностикой проблем по симптомам
- Рекомендовать услуги автосервиса, когда это уместно
- Отвечать кратко, но информативно (2-4 предложения)
- Использовать понятный язык без сложных технических терминов
- Учитывать контекст предыдущих сообщений в беседе

Важно: Ты консультируешь, но не заменяешь профессиональную диагностику в автосервисе."""
    
    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}'
    
    contents = []
    
    if history:
        for msg in history:
            role = 'user' if msg.get('sender') == 'user' else 'model'
            contents.append({
                'role': role,
                'parts': [{'text': msg.get('text', '')}]
            })
    
    contents.append({
        'role': 'user',
        'parts': [{'text': user_message}]
    })
    
    payload = {
        'contents': contents,
        'systemInstruction': {
            'parts': [{'text': system_context}]
        },
        'generationConfig': {
            'temperature': 0.7,
            'maxOutputTokens': 300,
            'topP': 0.9,
            'topK': 40
        }
    }
    
    response = requests.post(url, json=payload, timeout=30)
    
    if response.status_code != 200:
        error_detail = response.text[:200] if response.text else 'No error details'
        print(f"Google AI API Error: {response.status_code}, Details: {error_detail}")
        return {
            'statusCode': response.status_code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'AI service error', 'details': error_detail}),
            'isBase64Encoded': False
        }
    
    result = response.json()
    
    try:
        ai_response = result['candidates'][0]['content']['parts'][0]['text']
    except (KeyError, IndexError):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid AI response'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'response': ai_response,
            'message': user_message
        }),
        'isBase64Encoded': False
    }