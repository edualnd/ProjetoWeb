import { z } from 'zod';

const postSchema = z.object({
  text: z
    .string({
      required_error: 'O texto é obrigatorio para postagem.',
      invalid_type_error: 'O titulo deve ser um texto',
    })
    .min(5, 'A postagem deve ter no minimo 5 caracteres.')
    .max(255, 'A postagem deve ter no máximo 255 caracteress.'),
});

export default postSchema;
