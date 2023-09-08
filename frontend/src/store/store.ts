import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Course } from 'domain/courses';
import { Skill } from 'domain/skills';

interface StoreState {
  vacancyLink: string;
  skillList: Skill[] | undefined;
  checkedSkills: Skill[];
  courses: Course[];
  setVacancyLink: (vacancyLink: string) => void;
  setSkillList: (skillList: Skill[] | undefined) => void;
  setCheckedSkills: (skills: Skill[]) => void;
  setCourses: (courses: Course[]) => void;
}

const useStore = create<StoreState>(
  persist(
    (set) => ({
      vacancyLink: '',
      skillList: undefined,
      checkedSkills: [],
      courses: [],
      setCourses: (courses) => set({ courses }),
      setVacancyLink: (vacancyLink) => set({ vacancyLink }),
      setSkillList: (skillList) => set({ skillList }),
      setCheckedSkills: (checkedSkills) => set({ checkedSkills }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useStore };
