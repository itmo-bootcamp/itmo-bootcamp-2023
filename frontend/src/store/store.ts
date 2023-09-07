import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Skill } from 'domain/skills';

interface StoreState {
  vacancyLink: string;
  skillList: Skill[] | undefined;
  checkedSkills: Skill[];
  setVacancyLink: (vacancyLink: string) => void;
  setSkillList: (skillList: Skill[] | undefined) => void;
  setCheckedSkills: (skills: Skill[]) => void
}

const useStore = create<StoreState>(
  persist(
    (set) => ({
      vacancyLink: '',
      skillList: undefined,
      checkedSkills: [],
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
