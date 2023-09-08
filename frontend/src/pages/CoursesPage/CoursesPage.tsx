import React from 'react';
import { Flex, Stack, Text } from '@mantine/core';
import { useStore } from 'store';

import { Course } from 'shared/ui';

import styles from './styles.scss';

export const CoursesPage = () => {
  const { courses } = useStore();

  return (
    <div className={styles.wrapper}>
      <div className={styles.courseList}>
        <Flex align="center" gap="lg" wrap="wrap" className={styles.courses}>
          {courses.map(course => <Flex key={course.skill}>
            <Stack spacing="md">
              <Text fz="lg" fw="500">{course.skill}</Text>
              <Flex gap="md">
                {course.list.map(c => <Course course={c} key={c.title} />)}
              </Flex>
            </Stack>
          </Flex>)}
        </Flex>
      </div>
    </div>
  );
};
