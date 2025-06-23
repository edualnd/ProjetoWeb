import { z } from 'zod';

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, 'Comentario muito curto')
    .max(200, 'Comentario muito longo'),
});

export { commentSchema };
