import json
import requests

r = requests.get('http://api.openweathermap.org/data/2.5/weather?zip=12345,us&appid=6d4e51a5c3bb334e51a1508a0a1ced21')
data = r.json()
print(data)