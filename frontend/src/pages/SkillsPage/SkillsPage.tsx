import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Chip, Flex, Slider, Stack, Text } from '@mantine/core';
import { useStore } from 'store';

import { useGetCourses } from 'shared/api/hooks/useGetCourses';
import { Page } from 'shared/ui';

import styles from './styles.scss';

export function SkillsPage () {
  const {
    skillList,
    checkedSkills,
    vacancyLink,
    setCheckedSkills,
  } = useStore();

  const navigate = useNavigate();
  const [skillsNumber, setSkillsNumber] = useState(2);

  const { mutateAsync: fetchCourses, isLoading } = useGetCourses();

  if (!vacancyLink) {
    return <Navigate to="/" />;
  }

  const skillsAreSelected = !!checkedSkills.length;
  const canGenerate = skillsNumber && skillsAreSelected;

  const handleSkillCheck = (skillId: string) => {
    const shouldRemove = checkedSkills.includes(skillId);

    if (shouldRemove) {
      setCheckedSkills(checkedSkills.filter(s => s !== skillId));
      return;
    }

    // should add
    const newSkill = skillList?.find(s => s === skillId);

    if (newSkill) {
      setCheckedSkills([...checkedSkills, newSkill]);
    }
  };

  const submitCourses = () => {
    fetchCourses({ num: skillsNumber, skills: checkedSkills })
      .then(() => navigate('/courses'));
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
              key={skill}
              size="lg"
              checked={checkedSkills.includes(skill)}
              onChange={handleSkillCheck.bind({}, skill)}
            >
              {skill}
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
          loading={isLoading}
          onClick={submitCourses}
        >Сгенерировать курсы
        </Button>
      </Stack>
    </Page>
  );
}
