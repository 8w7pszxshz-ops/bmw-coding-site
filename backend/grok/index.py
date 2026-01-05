import json
import os
import urllib.request
import urllib.error

def handler(event: dict, context) -> dict:
    """Прокси для Grok API - работает без VPN в России"""
    
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
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Только POST запросы'})
        }
    
    try:
        body_str = event.get('body', '')
        if not body_str:
            body_data = {}
        else:
            try:
                body_data = json.loads(body_str)
            except json.JSONDecodeError:
                body_data = {}
        
        prompt = body_data.get('prompt', '').strip()
        
        if not prompt:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Параметр prompt обязателен'})
            }
        
        api_key = os.environ.get('XAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'API ключ Grok не настроен'})
            }
        
        grok_request = {
            'messages': [
                {
                    'role': 'system',
                    'content': 'Ты эксперт по кодированию BMW. Отвечай кратко и по делу на русском языке.'
                },
                {
                    'role': 'user',
                    'content': prompt
                }
            ],
            'model': 'grok-beta',
            'temperature': 0.7
        }
        
        req = urllib.request.Request(
            'https://api.x.ai/v1/chat/completions',
            data=json.dumps(grok_request).encode('utf-8'),
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {api_key}'
            },
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=30) as response:
            grok_response = json.loads(response.read().decode('utf-8'))
        
        answer = grok_response.get('choices', [{}])[0].get('message', {}).get('content', 'Нет ответа')
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'answer': answer,
                'model': 'grok-beta'
            }, ensure_ascii=False)
        }
        
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка Grok API: {error_body}'}, ensure_ascii=False)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}, ensure_ascii=False)
        }