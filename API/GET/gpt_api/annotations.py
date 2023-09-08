from pydantic import BaseModel


class GPTGet(BaseModel):
    '''Класс для валидации воходных параметров для отвута GPT'''
    question_text: str | list[str]