import json

import torch
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from annoy import AnnoyIndex

from parser.parser_request import parser_hh
from ml.open_ai import get_description
from ml.get_embedding import Embedder


device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
embedder = Embedder("sentence-transformers/LaBSE").to(device)

u = AnnoyIndex(768, 'angular')
u.load('data/AnnoyIndex_16.ann')
with open("data/id2name.json", "r") as file:
    id2name = json.load(file)
with open("data/id2link.json", "r") as file:
    id2link = json.load(file)
print("SYSTEM LOADED!!!")


def get_emb(descs):
    embeddings = embedder.get_embedding(list(descs.values()))
    for i, desc in enumerate(descs.keys()):
        descs[desc] = list(embeddings[i])

    return descs


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/", methods=["GET"])
def test():
    return {"Status": "Ok"}


@app.route("/get_keywords", methods=["POST"], endpoint='get_keywords')
@cross_origin()
def get_keywords():
    link = json.loads(request.data)["link"]
    keywords = parser_hh(link)

    return Response(keywords, mimetype='application/json')


@app.route("/get_keywords_desc", methods=["POST"], endpoint='get_keywords_desc')
@cross_origin()
def get_keywords_desc():
    result = []
    data = json.loads(request.data)
    keywords = data["keywords"]
    num_courses = data["num_courses"]
    descs = {}
    for keyword in keywords:
        keyword_desc = get_description(keyword)
        descs[keyword] = keyword_desc.strip()

    descs = get_emb(descs)
    for keyword, vector in descs.items():
        tmp = {}
        search_ids = u.get_nns_by_vector(vector, num_courses)
        tmp[keyword] = [(id2name[str(id)], id2link[str(id)])
                        for id in search_ids]
        result.append(tmp)

    return Response(json.dumps(result, ensure_ascii=False).encode('utf8'), mimetype='application/json')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
