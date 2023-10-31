from bs4 import BeautifulSoup
import requests

url = 'https://goodr.com/collections/all-models'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer' : 'https://google.com',
    'DNT' : '1'
}
response = requests.get(url, headers=headers )
soup = BeautifulSoup(response.content, 'html.parser')
itemName_list = soup.find_all("h4",{"class":"title3_5 goodr-product-grid-item-title"})
itemPrice_list = soup.find_all('p', {"class":"title2"})

print("Item                             Price")
for i in range(len(itemName_list)):
    print((itemName_list[i].get_text()) + '\t ' + (itemPrice_list[i].get_text()))