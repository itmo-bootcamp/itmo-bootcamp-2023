import torch
from transformers import AutoModel, AutoTokenizer, AutoConfig

class MeanPooling(torch.nn.Module):
    def __init__(self):
        super(MeanPooling, self).__init__()

    def forward(self, last_hidden_state, attention_mask):
        input_mask_expanded = attention_mask.unsqueeze(
            -1).expand(last_hidden_state.size()).float()
        sum_embeddings = torch.sum(last_hidden_state * input_mask_expanded, 1)
        sum_mask = input_mask_expanded.sum(1)
        sum_mask = torch.clamp(sum_mask, min=1e-9)
        mean_embeddings = sum_embeddings / sum_mask
        return mean_embeddings

class Embedder(torch.nn.Module):
    def __init__(self, path, max_len=512) -> None:
        super().__init__()
        self.path = path
        self.max_len = max_len

        self.model = AutoModel.from_pretrained(self.path)
        self.tokenizer = AutoTokenizer.from_pretrained(self.path)
        self.config = AutoConfig.from_pretrained(
            self.path, output_hidden_states=True)
        self.pool = MeanPooling()

    def get_embedding(self, inputs):
        encoded_input = self.tokenizer(
            inputs, padding=True, truncation=True, max_length=self.max_len, return_tensors='pt')
        encoded_input = encoded_input.to(next(self.parameters()).device)

        model_output = self.model(**encoded_input)
        sentence_embeddings = self.pool(
            model_output[0], encoded_input['attention_mask'])

        return sentence_embeddings

model_name = "ai-forever/sbert_large_nlu_ru"
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

embedder = Embedder(model_name)
embedder = embedder.to(device)

embedding = embedder.get_embedding(["Привет, как дела?"])
print(embedding)
