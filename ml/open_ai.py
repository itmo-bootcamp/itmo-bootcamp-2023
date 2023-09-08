import openai

from ml.config import CFG

openai.api_key = CFG.openai_api_key
system_msg = "Вы энциклопедия которая всего отвечает определением на термин"


def get_description(post_text):
    post_text = "Что такое: " + post_text


    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": post_text},
        ],
        # temperature=0.1,
        # frequency_penalty=2.0,
    )

    return response.choices[0].message.content


if __name__ == "__main__":
    answer = get_description(
        "Название: YOLOv7: Trainable bag-of-freebies sets new state-of-the-art for real-time object detectors. Описание: YOLOv7 surpasses all known object detectors in both speed and accuracy in the range from 5 FPS to 160 FPS and has the highest accuracy 56. 8% AP among all known real-time object detectors with 30 FPS or higher on GPU V100. 3,436 ⭐ | 1.32 stars / hour Дата: 6 Jul 2022 Ссылка: Статья"
    )
    print(answer)