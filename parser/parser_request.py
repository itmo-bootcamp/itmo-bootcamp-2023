from bs4 import BeautifulSoup
import requests
import json


def parser_hh(html: str) -> dict:
    '''
    :param html: ссылка на сайт
    :return: возвращает json файл
    **
    { 'Skills': [список навыков]   }
    **
    '''
    response = requests.get(html, allow_redirects=True, headers={'User-Agent': 'Custom123'})
    soup = BeautifulSoup(response.text, 'lxml')
    skills = soup.find_all('span', class_='bloko-tag__section bloko-tag__section_text')
    dict_skills = {}
    list_skills = []
    for skill in skills:
        list_skills.append(skill.text)
    dict_skills['Skills'] = list_skills
    return json.dumps(dict_skills, ensure_ascii=False).encode('utf8')