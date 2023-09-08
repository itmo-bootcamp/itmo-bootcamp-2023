import json
import requests

import torch
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from annoy import AnnoyIndex

from parser.parser_request import parser_hh
from ml.open_ai import get_description
from ml.get_embedding import Embedder


skill_url = 'http://45.80.71.85:8000/api/v1/skill/'

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
embedder = Embedder("sentence-transformers/LaBSE").to(device)

u = AnnoyIndex(768, 'angular')
u.load('data/AnnoyIndex_16.ann')
with open("data/id2name.json", "r") as file:
    id2name = json.load(file)
with open("data/id2link.json", "r") as file:
    id2link = json.load(file)
print("SYSTEM LOADED!!!")


def create_one(data: dict) -> Response:
    '''
    Создает запись в бд

    input: data: dict
    output: response: Response

    '''

    response = requests.post(skill_url, json=data)
    return response


def read(skills_names: list) -> Response:
    '''
    Чтение из бд

    input: data: dict
    output: response: Response
    '''

    params = '&'.join([f'name={name}' for name in skills_names])
    response = requests.get(skill_url + '?' + params)
    return response


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/", methods=["GET"])
def test() -> dict:
    '''
    Проводит тест

    input: None
    output: dict
    '''
    return {"Status": "Ok"}


@app.route("/get_keywords", methods=["POST"], endpoint='get_keywords')
@cross_origin()
def get_keywords() -> Response:
    '''
    Возвращает ключевые навыки

    input: None
    ouput: Response
    '''
    link = json.loads(request.data)["link"]
    keywords = parser_hh(link)

    return Response(keywords, mimetype='application/json')


@app.route("/get_keywords_desc", methods=["POST"], endpoint='get_keywords_desc')
@cross_origin()
def get_keywords_desc() -> Response:
    '''
    Сортирует ключевые навыки по релевантности

    input: None
    output: Response
    '''
    result = []
    data = json.loads(request.data)
    keywords = data["keywords"]
    num_courses = data["num_courses"]
    descs = {}
    for keyword in keywords:
        db_response = read([keyword]).json()
        if db_response:
            descs[keyword] = db_response[0]["vector"]
        else:
            keyword_desc = get_description(keyword)
            embedding = embedder.get_embedding(
                list(keyword_desc.strip()))[0].tolist()
            descs[keyword] = embedding
            create_one({"name": keyword, "vector": embedding})

    for keyword, vector in descs.items():
        tmp = {}
        search_ids = u.get_nns_by_vector(vector, num_courses)
        tmp[keyword] = [(id2name[str(id)], id2link[str(id)])
                        for id in search_ids]
        result.append(tmp)

    return Response(json.dumps(result, ensure_ascii=False).encode('utf8'), mimetype='application/json')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
