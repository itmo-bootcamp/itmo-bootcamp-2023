from loader import app

from .annotations import GPTGet


@app.get("/gpt_answer")
def gpt_answer(data: GPTGet):
    '''endpoint для отправки запрсов в GPT'''
    return "ok"