from pydantic import BaseModel


class GPTGet(BaseModel):
    '''Класс для валидации воходных параметров для ответа GPT'''
    question_text: str | list[str]