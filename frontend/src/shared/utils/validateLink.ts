import { z } from 'zod';

const schema =
    z.string({
      invalid_type_error: 'Ссылка должна быть строкой',
    })
      .url({ message: 'Невалидная ссылка' })
      .includes('https://hh.ru', {
        message: 'Адрес должен начинаться с https://hh.ru',
      });

const validateLink = (link: string) => {
  return schema.safeParse(link.trim());
};

export { validateLink };
