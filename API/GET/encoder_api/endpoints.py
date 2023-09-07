from app import app
from .annotations import TextGet


@app.get("/vector_text")
def text_to_vec(data: TextGet):
    '''endpoint для получения векторов из текста'''
    # TODO вызов вунции получения векторов
    return "ok"