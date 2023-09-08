import React from 'react';
import { Badge, Button, Card, Flex, Stack, Text } from '@mantine/core';

import { Course as CourseType } from 'domain/courses';

import styles from './styles.scss';

interface Props {
    course: CourseType;
}

export const Course = ({ course }: Props) => {
  const goToCourse = () => {
    if (course.url) {
      window.location.href = course.url;
    }
  };

  return (
    <Card className={styles.course}>
      <Stack spacing="4px">
        <Text fz="lg" fw={500}>{course.title}</Text>
        <Text className={styles.description}>{course.description}</Text>
        <Flex gap="sm" wrap="wrap" mt="8px">
          {course.skills?.map(skill => <Badge variant="outline" key={skill}>
            {skill}
          </Badge>)}
        </Flex>
        <Button onClick={goToCourse} mt="12px">Пройти курс</Button>
      </Stack>
    </Card>
  );
};
