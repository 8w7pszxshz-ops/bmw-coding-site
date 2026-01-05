import json
import os
import requests


def handler(event: dict, context) -> dict:
    """AI-ассистент для ответов на вопросы по строительным и ремонтным услугам"""
    
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не разрешен'})
        }
    
    # Parse request
    body = json.loads(event.get('body', '{}'))
    user_question = body.get('question', '').strip()
    
    if not user_question:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Вопрос не может быть пустым'})
        }
    
    # Get API key
    api_key = os.environ.get('GOOGLE_AI_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'API ключ не настроен'})
        }
    
    # System prompt for context
    system_context = """Ты — профессиональный консультант строительной компании "СтройМастер". 
Твоя задача — помогать клиентам с вопросами по следующим услугам:
- Отделка квартир (косметический и капитальный ремонт)
- Электромонтажные работы
- Сантехнические работы
- Установка окон и дверей
- Укладка плитки и напольных покрытий
- Малярные работы и покраска
- Монтаж гипсокартона и перегородок

Отвечай только на вопросы, связанные со строительством и ремонтом.
Если вопрос не по теме, вежливо сообщи, что можешь помочь только с вопросами по строительным услугам.
Будь дружелюбным, профессиональным и кратким."""
    
    # Call Google AI (Gemini)
    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}'
    
    payload = {
        'contents': [
            {
                'parts': [
                    {'text': system_context},
                    {'text': f'Вопрос клиента: {user_question}'}
                ]
            }
        ],
        'generationConfig': {
            'temperature': 0.7,
            'maxOutputTokens': 500
        }
    }
    
    response = requests.post(url, json=payload, timeout=30)
    
    if response.status_code != 200:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Ошибка при обращении к AI',
                'details': response.text
            })
        }
    
    result = response.json()
    ai_response = result['candidates'][0]['content']['parts'][0]['text']
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'question': user_question,
            'answer': ai_response
        })
    }
