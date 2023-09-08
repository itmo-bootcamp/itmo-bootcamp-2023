import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Button, Chip, Flex, Slider, Stack, Text } from '@mantine/core';
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

  const [skillsNumber, setSkillsNumber] = useState(2);

  if (!vacancyLink) {
    return <Navigate to="/" />;
  }

  const checkedSkillsIds = checkedSkills?.map(s => s.id) || [];
  const skillsAreSelected = !!checkedSkillsIds.length;
  const canGenerate = skillsNumber && skillsAreSelected;

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
      <Stack spacing="36px">
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
        <Stack spacing="lg">
          <Text align="center" fz="lg">Выберите количество курсов для освоения</Text>
          <Slider
            disabled={!skillsAreSelected}
            marks={[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
            ]}
            value={skillsNumber}
            max={3}
            min={1}
            onChange={setSkillsNumber}
          />
        </Stack>
        <Button
          size="lg"
          disabled={!canGenerate}
          className={styles.generateBtn}
        >Сгенерировать курсы</Button>
      </Stack>
    </Page>
  );
}
