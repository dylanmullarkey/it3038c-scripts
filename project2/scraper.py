# you must install requests and BeautifulSoup4 for this to work. in your terminal:
# pip3 install bs4
# pip install requests
# best to do this in a virtual python environment so it doesn't mess with future projects.


#youtube uses JavaScript so I will need to revisit this as I don't have the time to research and complete. 
from bs4 import BeautifulSoup
import requests

url = 'https://www.youtube.com/@archmdz/videos'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer' : 'https://google.com',
    'DNT' : '1'
}
response = requests.get(url, headers=headers )
soup = BeautifulSoup(response.content, 'html.parser')
uploads = soup.find_all('a', class_='productClickItemV2')

print(uploads)

