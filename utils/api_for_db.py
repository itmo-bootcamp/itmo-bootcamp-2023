import requests

skill_url = 'http://45.80.71.85:8000/api/v1/skill/'
skills_list_url = 'http://45.80.71.85:8000/api/v1/skills_list/'

"""
data = {
    'name': 'name_of_skill',
    'vector': [1, 2, 3.1415],
}
"""


def create_one(data):
    response = requests.post(skill_url, json=data)
    return response


def create_many(data_list):
    response = requests.post(skills_list_url, json={"data": data_list})
    return response


def read(skills_names):
    params = '&'.join([f'name={name}' for name in skills_names])
    response = requests.get(skill_url + '?' + params)
    return response


def read_all():
    response = requests.get(skills_list_url + '?all')
    return response


def update_one(data):
    response = requests.patch(skill_url, json=data)
    return response


def delete_one(skill_name):
    response = requests.delete(skill_url + f'?name={skill_name}', )
    return response


data = {
    'name': 'skill_1',
    'vector': [5, 6.112, 7.213],
}

data2 = {
    'name': 'skill_2',
    'vector': [1.23456, 6, 7],
}


# resp = create_one(data)
# resp = create_many([data, data2])
resp = read(["skill_1", "skill_2"])
# resp = read_all()
# resp = update_one(data)
# resp = delete_one("skill_1")

print(resp.status_code)
print(resp.json())
