# Инструкция по обновлению данных чип-тюнинга

## Шаг 1: Парсинг данных с reborn.tech

```bash
cd scripts
pip install -r requirements.txt
python parse_chiptuning.py
```

Скрипт создаст файл `reborn_bmw.xlsx` с актуальными данными по чип-тюнингу BMW.

## Шаг 2: Загрузка данных в backend функцию

Скопируйте созданный файл `reborn_bmw.xlsx` в папку `backend/parse-chiptuning/`:

```bash
cp reborn_bmw.xlsx ../backend/parse-chiptuning/
```

## Шаг 3: Деплой обновленной функции

```bash
cd ..
# В poehali.dev нажмите кнопку "Синхронизировать backend"
# Или используйте команду деплоя через CLI
```

## API Endpoint

После деплоя данные доступны по адресу:
```
GET https://functions.poehali.dev/8f9e18f2-51fd-4835-a3a1-c9b410946229
```

Ответ содержит массив моделей BMW с данными по двигателям и модификациям:
```json
[
  {
    "name": "BMW 3-series",
    "series": "F3x",
    "generation": "F",
    "engines": [
      {
        "code": "320i",
        "type": "petrol",
        "displacement": "2.0",
        "modifications": [
          {
            "name": "320i Stage 1",
            "powerBefore": 184,
            "powerAfter": 240,
            "torqueBefore": 270,
            "torqueAfter": 370,
            "price": 30000
          }
        ]
      }
    ]
  }
]
```

## Автоматизация

Если файл `reborn_bmw.xlsx` отсутствует, API возвращает mock данные для разработки.
После добавления реального файла — обновите данные через повторный деплой.
