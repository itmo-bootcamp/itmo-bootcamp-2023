import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Divider, Flex, TextInput } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import classNames from 'classnames';

import { validateLink } from 'shared/utils/validateLink';

import styles from './styles.scss';

interface Props {
  className?: string;
  onLinkSubmit: (link: string) => void;
}

const VacancyLinkInput = ({ className, onLinkSubmit }: Props) => {
  const [linkValue, setLinkValue] = useState('');
  const [validationError, setValidationError] = useState<undefined | string>();

  const handleLinkChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setLinkValue(value);
  };

  const onSubmit = () => {
    const { success, error } = validateLink(linkValue);

    if (success) {
      // api call
      setValidationError(undefined);
      return onLinkSubmit(linkValue);
    }

    const formattedError = error.issues[0].message;
    setValidationError(formattedError);
  };

  useEffect(() => {
    if (!linkValue.trim()) {
      return setValidationError(undefined);
    }
  }, [linkValue]);

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
            value={linkValue}
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
          className={styles.button}
          size="xl"
          variant="light"
          onClick={onSubmit}
        >
        Отправить
        </Button>
      </Flex>
    </Flex>
  );
};

export default VacancyLinkInput;
