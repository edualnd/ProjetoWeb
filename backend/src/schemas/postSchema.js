import { z } from 'zod';

const postSchema = z.object({
  title: z
    .string({
      required_error: 'O titulo é obrigatorio.',
      invalid_type_error: 'O titulo deve ser um texto',
    })
    .min(5, { message: 'O titulo deve ter no minimo 5 caracteres.' })
    .max(100, { message: 'O titulo deve ter no máximo 100 caracteress.' }),
});

export default postSchema;
