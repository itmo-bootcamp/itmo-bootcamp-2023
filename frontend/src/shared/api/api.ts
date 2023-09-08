import { Skill } from 'domain/skills';

export const API_PATH = {
  SEND_LINK:  'get_keywords',
  GET_COURSES: 'get_keywords_desc',
} as const;

export type GetSkillsResult = {
  Skills: Skill[];
  title: string;
}

const API_HOST = 'https://876e-62-217-186-209.ngrok.io/';

export const sendLink = (link: string) => {
  return fetch(API_HOST + API_PATH.SEND_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ link }),
  }).then(res => res.json());
};

export type GetCoursesQuery = {
  keywords: Skill[];
  num_courses: number;
}
export const getCourses = ({ keywords, num_courses }: GetCoursesQuery) => {
  return fetch(API_HOST + API_PATH.GET_COURSES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keywords, num_courses }),
  }).then(res => res.json());
};
