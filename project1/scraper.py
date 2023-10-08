from bs4 import BeautifulSoup
import requests

url = 'https://www.macpremierfitness.com/indoor-pool/indoor-pool-schedule-and-class-descriptions/'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer' : 'https://google.com',
    'DNT' : '1'
}
response = requests.get(url, headers=headers )
content = BeautifulSoup(response.content, 'html.parser')

#content.find_all('span', class_="event evowv_tb_event")
#content.find_all('div', class_="evowv_col_events")
content.select_one('evowv_col_events')
print (content)
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