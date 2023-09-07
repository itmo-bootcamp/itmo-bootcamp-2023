import { MOCKED_SKILLS } from 'mocks/entities/skills';
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/link', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json(MOCKED_SKILLS),
    );
  }),
];
