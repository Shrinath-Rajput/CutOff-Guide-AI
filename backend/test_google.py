import urllib.request, json, urllib.error
req = urllib.request.Request(
    'http://localhost:8000/api/auth/google',
    data=json.dumps({'token': 'invalid_token_123'}).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)
try:
    urllib.request.urlopen(req)
except urllib.error.HTTPError as e:
    print(e.read().decode())
