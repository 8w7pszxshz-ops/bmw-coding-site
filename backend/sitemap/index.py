def handler(event, context):
    """Генерация sitemap.xml со всеми страницами сайта Reborn BMW"""

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

    base = 'https://reborn-bmw.tech'
    today = '2026-02-15'

    pages = [
        ('/', today, 'weekly', '1.0'),
        ('/chip-tuning', today, 'weekly', '0.9'),
        ('/coding', today, 'monthly', '0.9'),
        ('/keys', today, 'monthly', '0.8'),
        ('/ecology', today, 'monthly', '0.8'),
        ('/prices', today, 'weekly', '0.9'),
        ('/about', today, 'monthly', '0.7'),
        ('/error-codes', today, 'weekly', '0.7'),
        ('/blog', today, 'weekly', '0.8'),
        ('/blog/stoit-li-delat-chip-tuning-bmw', '2025-12-10', 'monthly', '0.7'),
        ('/blog/top-10-bmw-dlya-chip-tuninga', '2025-12-15', 'monthly', '0.7'),
    ]

    models = [
        'bmw-f30', 'bmw-f10', 'bmw-g20', 'bmw-g30', 'bmw-e90', 'bmw-e60',
        'bmw-f15', 'bmw-g05', 'bmw-f25', 'bmw-g01', 'bmw-f20', 'bmw-g11', 'bmw-f48'
    ]
    for slug in models:
        pages.append((f'/chip-tuning/{slug}', today, 'monthly', '0.8'))

    engines = ['n55', 'b58', 'n54', 'b48', 'n20', 's58', 'n57']
    for slug in engines:
        pages.append((f'/engines/{slug}', today, 'monthly', '0.8'))

    urls = ''
    for path, lastmod, freq, priority in pages:
        urls += f'''  <url>
    <loc>{base}{path}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>
'''

    xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls}</urlset>'''

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=86400'
        },
        'body': xml
    }
