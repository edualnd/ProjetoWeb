import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().min(3).max(30).email(),
  password: z.string().min(3).max(20),
  role: z.enum(['COMMON', 'PROFESSIONAL']).default('COMMON').optional(),
  userImage: z.string().optional(),
  bio: z.string().min(0).max(100).optional(),
});

export default userSchema;
