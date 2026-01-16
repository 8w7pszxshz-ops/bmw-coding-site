import json
import requests
import boto3
import os
import re

def handler(event: dict, context) -> dict:
    '''Скачивает шрифт из OneDrive и загружает в S3'''
    method = event.get('httpMethod', 'GET')
    
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
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        onedrive_url = body.get('url', '')
        
        if not onedrive_url:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'URL not provided'})
            }
        
        # Преобразуем sharing URL в download URL
        # Формат: https://api.onedrive.com/v1.0/shares/u!{shareId}/root/content
        try:
            # Извлекаем share ID из URL
            # OneDrive использует base64-encoded share token
            share_token = onedrive_url.replace('https://', '').replace('http://', '')
            share_token = 'u!' + requests.utils.quote(share_token.encode('utf-8').hex())
            
            # Пробуем прямой download через API
            download_url = f"https://api.onedrive.com/v1.0/shares/{share_token}/root/content"
            
            # Скачиваем файл
            response = requests.get(download_url, allow_redirects=True, timeout=30)
            
            if response.status_code != 200:
                # Пробуем альтернативный метод - добавляем ?download=1
                alt_url = onedrive_url + ('&' if '?' in onedrive_url else '?') + 'download=1'
                response = requests.get(alt_url, allow_redirects=True, timeout=30)
            
            if response.status_code != 200:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': f'Failed to download: {response.status_code}'})
                }
            
            font_data = response.content
            
            # Загружаем в S3
            s3 = boto3.client('s3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
            )
            
            font_filename = 'RebornTechnologies.ttf'
            s3.put_object(
                Bucket='files',
                Key=f'fonts/{font_filename}',
                Body=font_data,
                ContentType='font/ttf'
            )
            
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/fonts/{font_filename}"
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'url': cdn_url,
                    'size': len(font_data)
                })
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)})
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
