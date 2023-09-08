import { z } from 'zod';

const schema =
    z.string({
      invalid_type_error: 'Ссылка должна быть строкой',
    })
      .url({ message: 'Невалидная ссылка' })
      .includes('https://', {
        message: 'Адрес должен начинаться с https://',
      });

const validateLink = (link: string) => {
  return schema.safeParse(link.trim());
};

export { validateLink };
