import React from 'react';
import { Flex, Loader as ToolkitLoader, Stack, Text } from '@mantine/core';

import styles from './styles.scss';

interface Props {
    title: string;
    description?: string;
}

export const Loader = ({ title,description }: Props) => {
  return (
    <Stack
      className={styles.loaderWrapper}
      align="center"
      spacing="md"
    >
      <ToolkitLoader variant="dots" />
      <Text fz="xl">{title}</Text>
      <Text>{description}</Text>
    </Stack>
  );
};
