import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Page = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.pageWrapper, className)}>{children}</div>
  );
};
