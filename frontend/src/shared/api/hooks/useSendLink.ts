import { useMutation } from 'react-query';
import { useStore } from 'store';

import { Skill } from 'domain/skills';

import { sendLink } from '../api';

export const useSendLink = () => {
  const { setSkillList } = useStore();
  return useMutation<Skill[], unknown, string>(sendLink, {
    onSuccess: (data) => setSkillList(data),
  });
};
