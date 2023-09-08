import requests
import json

from bs4 import BeautifulSoup


def parser_hh(html: str) -> dict:
    '''
    :param html: ссылка на сайт
    :return: возвращает json файл
    **
    { 'Skills': [список навыков]   }
    **
    '''
    response = requests.get(html, allow_redirects=True,
                            headers={'User-Agent': 'Custom123'})
    soup = BeautifulSoup(response.text, 'lxml')
    skills = soup.find_all(
        'span', class_='bloko-tag__section bloko-tag__section_text')
    title = soup.find_all('h1', class_='bloko-header-section-1')[0].text
    dict_skills = {}
    list_skills = []
    for skill in skills:
        list_skills.append(skill.text)
    dict_skills['Skills'] = list_skills
    dict_skills["title"] = title
    return json.dumps(dict_skills, ensure_ascii=False).encode('utf8')
