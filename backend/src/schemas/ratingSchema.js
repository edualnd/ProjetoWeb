import { z } from 'zod';

const ratingSchema = z.object({

    rating: z.number()
    .min(1)
    .max(5)
    .refine(val => val >= 1 && val <= 5, {
        message: 'A nota deve estar entre 1 e 5 estrelas',
      }),

})

export default ratingSchema;