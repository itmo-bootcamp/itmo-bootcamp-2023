import { Skill } from 'domain/skills';
import { Vacancy } from 'domain/vacancy';

export const API_PATH = {
  SEND_LINK:  'api/link',
  GET_COURSES: 'api/courses',
} as const;

export type GetSkillsResult = {
  skills: Skill[];
  vacancy: Vacancy;
}

export const sendLink = (link: string) => {
  return fetch(API_PATH.SEND_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ link }),
  }).then(res => res.json());
};

export type GetCoursesQuery = {
  skills: Skill[];
  num: number;
}
export const getCourses = ({ num,skills }: GetCoursesQuery) => {
  return fetch(API_PATH.GET_COURSES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ skills, num }),
  }).then(res => res.json());
};
