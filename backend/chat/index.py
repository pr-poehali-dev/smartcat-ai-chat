import json
import http.client
import ssl

def handler(event: dict, context) -> dict:
    """
    LongCat API интеграция для SmartCat AI чата
    """
    method = event.get('httpMethod', 'GET')

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
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        body_data = json.loads(event.get('body', '{}'))
        user_message = body_data.get('message', '')

        if not user_message:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Message is required'})
            }

        api_key = 'ak_24D7VN0bq0qj2Rn30u5or9h64rO7r'
        
        request_payload = {
            'model': 'longcat-mini',
            'messages': [
                {
                    'role': 'system',
                    'content': 'Ты SmartCat AI — умный ассистент для поиска и анализа информации. Отвечай кратко, по делу и дружелюбно. Используй эмодзи где уместно.'
                },
                {
                    'role': 'user',
                    'content': user_message
                }
            ],
            'temperature': 0.7,
            'max_tokens': 2000
        }
        
        request_data = json.dumps(request_payload)
        
        context_ssl = ssl.create_default_context()
        conn = http.client.HTTPSConnection('api.longcat.ai', context=context_ssl, timeout=30)
        
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        
        conn.request('POST', '/v1/chat/completions', request_data, headers)
        
        response = conn.getresponse()
        response_body = response.read().decode('utf-8')
        
        if response.status != 200:
            return {
                'statusCode': response.status,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': f'LongCat API error: {response_body}'
                })
            }
        
        response_data = json.loads(response_body)
        ai_message = response_data.get('choices', [{}])[0].get('message', {}).get('content', 'Извини, не смог получить ответ')

        conn.close()

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'message': ai_message,
                'model': 'longcat-mini'
            })
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': str(e)
            })
        }