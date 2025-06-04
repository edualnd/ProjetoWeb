import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().min(3).max(30).email(),
  password: z.string().min(3).max(20),
  role: z.enum(['COMMON', 'PROFESSIONAL']).default('COMMON').optional(),
  userImage: z.string().optional(),
  bio: z.string().min(0).max(100).optional(),
});

const professionalRoleSchema = z.object(({
  document: z.string().min(11).max(18),
  name:z.string().min(3).max(50),

}))
export {userSchema, professionalRoleSchema};
