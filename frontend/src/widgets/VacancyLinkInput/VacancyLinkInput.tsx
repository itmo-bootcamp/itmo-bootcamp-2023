import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Divider, Flex, TextInput } from '@mantine/core';
import { IconAnalyze, IconExternalLink } from '@tabler/icons-react';
import classNames from 'classnames';
import { z } from 'zod';

import styles from './styles.scss';

interface Props {
  className?: string;
}

const validationSchema = z.
  string({
    invalid_type_error: 'Ссылка должна быть строкой',
  })
  .url({ message: 'Невалидная ссылка' })
  .includes('https://hh.ru', {
    message: 'Адрес должен начинаться с https://hh.ru',
  });

const VacancyLinkInput = ({ className }: Props) => {
  const [link, setLink] = useState('');
  const [validationError, setValidationError] = useState<undefined | string>();

  const handleLinkChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setLink(value);
  };

  const submit = () => {
    const { success, error } = validationSchema.safeParse(link);

    if (success) {
      // api call
      return setValidationError(undefined);
    }

    const formattedError = error.issues[0].message;
    setValidationError(formattedError);
  };

  useEffect(() => {
    if (!link.trim()) {
      return setValidationError(undefined);
    }
  }, [link]);

  return (
    <Flex
      direction={'column'}
      className={classNames(styles.widgetWrapper, className)}
    >
      <Flex
        align={'center'}
        justify="space-between"
        gap="md"
        className={styles.linkInput}
      >
        <Flex direction="column" className={styles.inputWrapper}>
          <TextInput
            placeholder="Введите ссылку на вакансию..."
            error={validationError}
            variant="unstyled"
            icon={<IconExternalLink />}
            onChange={handleLinkChange}
            value={link}
            size="xl"
            classNames={{
              wrapper: styles.inputWrapper,
              input: styles.input,
              error: styles.errorMessage,
            }}

          />
          <Divider my="sm" variant="dashed" />
        </Flex>
        <Button
          leftIcon={<IconAnalyze />}
          className={styles.button}
          onClick={submit}
        >
        Анализировать
        </Button>
      </Flex>
    </Flex>
  );
};

export default VacancyLinkInput;
