import { Skill } from './skills';

export type Course = {
    title: string;
    url?: string;
}

export type ApiCourse = Record<Skill, [
    [string, string]
]>

export type CourseList = {
    skill: string;
    list: Course[];
}
