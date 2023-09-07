import React from 'react';
import { Navigate } from 'react-router';
import { Chip, Flex, Stack, Text } from '@mantine/core';
import { useStore } from 'store';

import { Page } from 'shared/ui';

import styles from './styles.scss';

export function SkillsPage () {
  const {
    skillList,
    checkedSkills,
    vacancyLink,
    setCheckedSkills,
  } = useStore();

  if (!vacancyLink) {
    return <Navigate to="/" />;
  }

  const checkedSkillsIds = checkedSkills?.map(s => s.id) || [];

  const handleSkillCheck = (skillId: Id) => {
    const shouldRemove = checkedSkillsIds.includes(skillId);

    if (shouldRemove) {
      setCheckedSkills(checkedSkills.filter(s => s.id !== skillId));
      return;
    }

    // should add
    const newSkill = skillList?.find(s => s.id === skillId);

    if (newSkill) {
      setCheckedSkills([...checkedSkills, newSkill]);
    }
  };

  return (
    <Page className={styles.skillsPage}>
      <Stack spacing="lg">
        <Text align="center" fz="lg">Выберите навыки,<br /> которыми хотите овладеть в первую очередь</Text>
        <Flex
          className={styles.skills}
          gap="sm"
          align="center"
          wrap="wrap"
          justify="center"
        >
          {skillList?.map(skill => <Chip
            variant="light"
            key={skill.id}
            size="lg"
            checked={checkedSkillsIds.includes(skill.id)}
            onChange={handleSkillCheck.bind({}, skill.id)}
          >
            {skill.name}
          </Chip>,
          )}
        </Flex>
      </Stack>
    </Page>
  );
}
