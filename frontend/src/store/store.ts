import { create } from 'zustand';

import { Skill } from 'domain/skills';

interface StoreState {
  vacancyLink: string;
  skillList: Skill[] | undefined;
  setVacancyLink: (vacancyLink: string) => void;
  setSkillList: (skillList: Skill[] | undefined) => void;
}

const useStore = create<StoreState>((set) => ({
  vacancyLink: '',
  skillList: undefined,
  setVacancyLink: (vacancyLink) => set({ vacancyLink }),
  setSkillList: (skillList) => set({ skillList }),
}));

export { useStore };
