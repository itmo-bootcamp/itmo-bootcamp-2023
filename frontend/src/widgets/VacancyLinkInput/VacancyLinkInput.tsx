import React from 'react';
import { Button, Flex,Input } from '@mantine/core';
import { IconAnalyze, IconExternalLink } from '@tabler/icons-react';
import classNames from 'classnames';

import styles from './styles.scss';

interface Props {
  className?: string;
}

const VacancyLinkInput = ({ className }: Props) => {
  return (
    <Flex
      align={'center'}
      justify="space-between"
      gap="md"
      className={classNames(styles.widgetWrapper, className)}
    >
      <Input
        placeholder="Введите ссылку на вакансию"
        icon={<IconExternalLink height={16}/>}
        size="md"
        classNames={{
          input: styles.input,
          wrapper: styles.inputWrapper,
        }}
      />
      <Button
        leftIcon={<IconAnalyze />}
        className={styles.button}
      >
        Вперед
      </Button>
    </Flex>
  );
};

export default VacancyLinkInput;
