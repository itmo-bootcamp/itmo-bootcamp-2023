import openai

from ml.config import CFG


openai.api_key = CFG.openai_api_key
system_msg = "Вы энциклопедия которая всегда отвечает определением на термин"


def get_description(post_text):
    post_text = "Что такое: " + post_text
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": post_text},
        ],
    )

    return response.choices[0].message.content
