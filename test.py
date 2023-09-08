import requests

r1 = requests.get("http://0.0.0.0:5000/")
print(r1.text)

r2 = requests.post("http://0.0.0.0:5000/get_keywords", json={"link": "https://spb.hh.ru/vacancy/86009071"})
print(r2.text)

r3 = requests.post("http://0.0.0.0:5000/get_keywords_desc", json={"keywords": ["Ответственность и исполнительность", "Стропальщик"]})
print(r3.text)