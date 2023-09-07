from pydantic import BaseModel


class TextGet(BaseModel):
    '''Класс для валидации воходных параметров для векторизации'''
    text_for_vectorize: str | list[str]