import { COURSES_MOCKED } from 'mocks/entities/courses';
import { MOCKED_SKILLS } from 'mocks/entities/skills';
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/link', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json(MOCKED_SKILLS),
    );
  }),
  rest.post('/api/courses', (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.json(COURSES_MOCKED),
    );
  }),
];
