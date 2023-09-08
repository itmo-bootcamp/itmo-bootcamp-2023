import React from 'react';
import { Flex } from '@mantine/core';
import { useStore } from 'store';

import { Course } from 'shared/ui';

import styles from './styles.scss';

export const CoursesPage = () => {
  const { courses } = useStore();

  return (
    <div className={styles.wrapper}>
      <div className={styles.courseList}>
        <Flex align="center" gap="sm" wrap="wrap" className={styles.courses}>
          {courses.map(course => <Course course={course} key={course.url} />)}
        </Flex>
      </div>
    </div>
  );
};
