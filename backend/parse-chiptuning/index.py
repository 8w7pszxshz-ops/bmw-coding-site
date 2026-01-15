import json
import os
import pandas as pd
from typing import Dict, List, Any

def handler(event: dict, context) -> dict:
    '''API для загрузки и парсинга данных чип-тюнинга из Excel файла'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method == 'GET':
        excel_path = os.path.join(os.path.dirname(__file__), 'reborn_bmw.xlsx')
        
        if not os.path.exists(excel_path):
            mock_data = [{
                'model': 'BMW 3-series F3x',
                'modification': '320i',
                'engine_hp_stock': 184,
                'engine_nm_stock': 270,
                'stage': 'Stage 1',
                'hp_after': 240,
                'nm_after': 370,
                'price': 30000
            }]
            df = pd.DataFrame(mock_data)
        else:
            df = pd.read_excel(excel_path)
        
        models_dict: Dict[str, Dict[str, Any]] = {}
        
        for _, row in df.iterrows():
            model_name = row['model']
            modification = row['modification']
            
            if pd.isna(model_name) or pd.isna(modification):
                continue
            
            series = model_name.split()[-1] if ' ' in model_name else model_name
            
            if model_name not in models_dict:
                models_dict[model_name] = {
                    'name': ' '.join(model_name.split()[:-1]) if ' ' in model_name else model_name,
                    'series': series,
                    'generation': 'F' if series.startswith(('E', 'F')) else 'G',
                    'engines': {}
                }
            
            engine_key = modification
            if engine_key not in models_dict[model_name]['engines']:
                models_dict[model_name]['engines'][engine_key] = {
                    'code': modification.split()[0] if ' ' in modification else modification,
                    'type': 'diesel' if 'd' in modification.lower() else 'petrol',
                    'displacement': '2.0',
                    'modifications': []
                }
            
            stage_name = row.get('stage', 'Stage 1')
            
            models_dict[model_name]['engines'][engine_key]['modifications'].append({
                'name': f"{modification} {stage_name}",
                'powerBefore': int(row.get('engine_hp_stock', 0)),
                'powerAfter': int(row.get('hp_after', 0)),
                'torqueBefore': int(row.get('engine_nm_stock', 0)),
                'torqueAfter': int(row.get('nm_after', 0)),
                'price': int(row.get('price', 30000))
            })
        
        result = []
        for model_data in models_dict.values():
            model_data['engines'] = list(model_data['engines'].values())
            result.append(model_data)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result)
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }