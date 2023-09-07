import React, { ReactNode } from 'react';

import styles from './styles.scss';

interface Props {
    children: ReactNode;
}

export const Page = ({ children }: Props) => {
  return (
    <div className={styles.pageWrapper}>{children}</div>
  );
};
