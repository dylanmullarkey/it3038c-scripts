# you must install requests and BeautifulSoup4 for this to work. in your terminal:
# pip3 install bs4
# pip install requests
# best to do this in a virtual python environment so it doesn't mess with future projects.

from bs4 import BeautifulSoup
import requests

url = 'https://www.microcenter.com/search/search_results.aspx?Ntt=GeForce+RTX+4090&Ntx=mode+MatchPartial&Ntk=all&sortby=match&N=4294966998&myStore=true'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer' : 'https://google.com',
    'DNT' : '1'
}
response = requests.get(url, headers=headers )
soup = BeautifulSoup(response.content, 'html.parser')
products = soup.find_all('a', class_='productClickItemV2')

print(products)

"""  
MAC_classes = html_soup.final_all('span', class_="event evowv_tb_event")
filename = 'poolSchdule.csv'
f = open(filename, 'w')

csvHeaders = 'Event, Time \n'

f.write(csvHeaders)

for events in MAC_classes:
    event = events.find('span', class_="event evowv_tb_event").text
    time = events.find('span', class_="time").text

    f.write(event + ',' + time)
f.close()
"""
