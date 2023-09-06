import React from 'react';
import { MantineProvider } from '@mantine/core';

import VacancyLinkPage from 'pages/VacancyLinkPage/VacancyLinkPage';

import styles from './styles.scss';

const App = () => {
  return (
    <MantineProvider theme={{
      fontFamily: 'Open Sans',
      colorScheme: 'dark',
    }}>
      <div className={styles.appWrapper}>
        <VacancyLinkPage />
      </div>
    </MantineProvider>
  );
};

export default App;
