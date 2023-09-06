import React from 'react';
import VacancyLinkInput from 'widgets/VacancyLinkInput/VacancyLinkInput';

import styles from './styles.scss';

const VacancyLinkPage = () => {
  return (
    <div className={styles.page}>
      <VacancyLinkInput className={styles.linkInputWidget} />
    </div>
  );
};

export default VacancyLinkPage;
