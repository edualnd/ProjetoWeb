import { z } from 'zod';

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, 'Username muito curto')
    .max(200, 'Username muito longo'),
});

export { commentSchema };