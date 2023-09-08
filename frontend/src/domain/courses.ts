import { Skill } from './skills';

export type Course = {
    title: string;
    description: string;
    url?: string;
    skills?: Skill[];
}
