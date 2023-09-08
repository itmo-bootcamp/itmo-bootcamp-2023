from loader import app
import torch
from .annotations import TextGet
from ml.get_embedding import Embedder


embedder = Embedder("ai-forever/sbert_large_nlu_ru")
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
embedder = embedder.to(device)



@app.post("/vector_text")
def text_to_vec(data: TextGet):
    '''endpoint для получения векторов из текста'''
    embedding = embedder.get_embedding(data.text_for_vectorize)

    return embedding
