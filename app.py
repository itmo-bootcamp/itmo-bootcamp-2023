from flask import Flask, request
from parser.parser_request import parser_hh
from ml.open_ai import get_description
import json


app = Flask(__name__)


@app.route("/", methods=["GET"])
def test():
    return {"Status": "Ok"}


@app.route("/get_keywords", methods=["POST"])
def get_keywords():
    link = request.json["link"]
    keywords = parser_hh(link)
    
    return keywords

@app.route("/get_keywords_desc", methods=["POST"])
def get_keywords_desc():
    keywords = request.json["keywords"]
    descs = {}
    for keyword in keywords:
        keyword_desc = get_description(keyword)
        descs[keyword] = keyword_desc
    
    return descs
    # return json.dumps(descs, ensure_ascii=False).encode('utf8')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)