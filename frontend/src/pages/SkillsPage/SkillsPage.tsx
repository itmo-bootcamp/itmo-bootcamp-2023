import React from 'react';
import { Badge, Stack } from '@mantine/core';
import { useStore } from 'store';

import { Page } from 'shared/ui';

const SkillsPage = () => {
  const { skillList } = useStore();

  return (
    <Page>
      <Stack>
        {skillList?.map(skill => <Badge key={skill.id}>
          {skill.name}
        </Badge>,
        )}
      </Stack>
    </Page>
  );
};

export default SkillsPage;
