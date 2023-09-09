import openai

from ml.config import CFG


openai.api_key = CFG.openai_api_key
system_msg = "Вы превосходный AI помощник."


def get_description(post_text):
    # post_text = f"Напиши краткое описание курса для изучения {post_text}"
    # post_text = f"Дай развернутый ответ что это: {post_text}."
    # post_text = f"В каких онлайн курсах может понадобиться навык {post_text}."
    # post_text = f"Придумай название онлайн курса по {post_text}."
    post_text = f"Что такое {post_text}."
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": post_text},
        ],
    )

    return response.choices[0].message.content
