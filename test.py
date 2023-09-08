import requests
import json


r1 = requests.get("http://0.0.0.0:5000/")
print(r1.text)

r2 = requests.post("http://0.0.0.0:5000/get_keywords",
                   data=json.dumps({"link": "https://shelekhov.hh.ru/vacancy/86116732"}))
print(r2.text)

r3 = requests.post("http://0.0.0.0:5000/get_keywords_desc", data=json.dumps(
    {"keywords": ["Python", "Numpy", "Pandas", "ML", "OCR"], "num_courses": 3}))
print(r3.text)
