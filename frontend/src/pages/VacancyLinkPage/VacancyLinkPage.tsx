import React from 'react';
import { useNavigate } from 'react-router';
import { Stack } from '@mantine/core';
import { useStore } from 'store';
import VacancyLinkInput from 'widgets/VacancyLinkInput/VacancyLinkInput';

import { useSendLink } from 'shared/api/hooks/useSendLink';
import { Loader, Page } from 'shared/ui';

import styles from './styles.scss';

export const VacancyLinkPage = () => {
  const { setVacancyLink } = useStore();
  const navigate = useNavigate();

  const { mutateAsync: sendLink, isLoading } = useSendLink();

  const onLinkSubmit = (link: string) => {
    setVacancyLink(link);
    sendLink(link).then(() => navigate('/skills'));
  };

  return (
    <Page>
      <Stack spacing="xl" className={styles.page}>
        <VacancyLinkInput
          className={styles.linkInputWidget}
          onLinkSubmit={onLinkSubmit}
        />
        {isLoading && <Loader title="Собираем данные о навыках..." />}
      </Stack>
    </Page>
  );
};
