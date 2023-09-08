import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CourseList } from 'domain/courses';
import { Skill } from 'domain/skills';

interface StoreState {
  vacancyLink: string;
  skillList: Skill[] | undefined;
  checkedSkills: Skill[];
  courses: CourseList[];
  vacancyResult: string | undefined;
  setVacancyLink: (vacancyLink: string) => void;
  setVacancyResult: (vacancyResult: string) => void;
  setSkillList: (skillList: Skill[] | undefined) => void;
  setCheckedSkills: (skills: Skill[]) => void;
  setCourses: (courses: CourseList[]) => void;
}

const useStore = create<StoreState>(
  persist(
    (set) => ({
      vacancyLink: '',
      vacancyResult: undefined,
      skillList: undefined,
      checkedSkills: [],
      courses: [],
      setVacancyResult: (vacancyResult) => set({ vacancyResult }),
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
