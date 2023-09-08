import { useMutation } from 'react-query';
import { useStore } from 'store';

import { GetSkillsResult, sendLink } from '../api';

export const useSendLink = () => {
  const { setSkillList, setVacancyResult } = useStore();
  return useMutation<GetSkillsResult, unknown, string>(sendLink, {
    onSuccess: (data) => {
      const { skills, vacancy } = data;
      setSkillList(skills);
      setVacancyResult(vacancy);

    },
  });
};
