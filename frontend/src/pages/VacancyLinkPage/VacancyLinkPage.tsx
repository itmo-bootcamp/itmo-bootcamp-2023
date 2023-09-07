import React from 'react';
import { Stack } from '@mantine/core';
import VacancyLinkInput from 'widgets/VacancyLinkInput/VacancyLinkInput';

import { Loader } from 'shared/ui';

import styles from './styles.scss';

const VacancyLinkPage = () => {
  return (
    <Stack spacing="xl" className={styles.page}>
      <VacancyLinkInput className={styles.linkInputWidget} />
      <Loader title="Собираем данные о навыках..." />
    </Stack>
  );
};

export default VacancyLinkPage;
