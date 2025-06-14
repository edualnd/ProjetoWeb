import { z } from 'zod';

const userSchema = z.object({
  username: z
    .string()
    .min(3, 'Username muito curto')
    .max(30, 'Username muito longo'),
  email: z.string().min(3).max(30).email('Email não é válido'),
  password: z.string().min(3, 'Senha muita curta').max(20, 'Senha muito longa'),
  role: z.enum(['COMMON', 'PROFESSIONAL']).default('COMMON').optional(),
});

const professionalRoleSchema = z.object({
  document: z.string().min(11).max(18),
  name: z.string().min(3).max(50),
});

const profileSchema = z.object({
  userImage: z.string(),
  bio: z.string().min(0).max(100),
});
export { userSchema, professionalRoleSchema, profileSchema };
