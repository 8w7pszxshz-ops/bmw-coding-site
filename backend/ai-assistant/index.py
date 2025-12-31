import json
import requests

def handler(event: dict, context) -> dict:
    '''AI консультант по автомобилям через Google Gemini API'''
    
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
    
    user_message = body.get('message', '').strip()
    api_key = body.get('apiKey', '').strip()
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
    
    if not api_key:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'API key is required'}),
            'isBase64Encoded': False
        }
    
    system_prompt = """Ты — эксперт-консультант автосервиса "Bocha Reborn" по чип-тюнингу и диагностике автомобилей.

Твои правила:
- Давай конкретные советы по эксплуатации и обслуживанию авто
- Объясняй преимущества чип-тюнинга простым языком
- Помогай с диагностикой проблем по симптомам
- Отвечай кратко (2-4 предложения)
- Рекомендуй автосервис, когда уместно
- Учитывай контекст всей беседы

Важно: ты консультируешь, но не заменяешь профессиональную диагностику."""

    contents = []
    
    for msg in history:
        role = 'user' if msg.get('sender') == 'user' else 'model'
        text = msg.get('text', '')
        if text:
            contents.append({
                'role': role,
                'parts': [{'text': text}]
            })
    
    contents.append({
        'role': 'user',
        'parts': [{'text': user_message}]
    })
    
    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}'
    
    payload = {
        'contents': contents,
        'systemInstruction': {
            'parts': [{'text': system_prompt}]
        },
        'generationConfig': {
            'temperature': 0.8,
            'maxOutputTokens': 250,
            'topP': 0.95
        }
    }
    
    try:
        response = requests.post(url, json=payload, timeout=20)
        response_data = response.json()
        
        if response.status_code != 200:
            error_msg = response_data.get('error', {}).get('message', 'Unknown error')
            print(f'Gemini API Error ({response.status_code}): {error_msg}')
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'AI error: {error_msg}'}),
                'isBase64Encoded': False
            }
        
        ai_text = response_data['candidates'][0]['content']['parts'][0]['text']
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'response': ai_text,
                'message': user_message
            }),
            'isBase64Encoded': False
        }
        
    except requests.Timeout:
        return {
            'statusCode': 408,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Request timeout'}),
            'isBase64Encoded': False
        }
    except KeyError:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid response from AI'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        print(f'Unexpected error: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Internal server error'}),
            'isBase64Encoded': False
        }
