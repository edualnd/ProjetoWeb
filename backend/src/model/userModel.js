import prisma from '../utils/prisma/db.js';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().min(3).max(30).email(),
  password: z.string().min(3).max(20),
  role: z.enum(['COMMON', 'PROFESSIONAL']).default('COMMON').optional(),
  userImage: z.string().optional(),
  bio: z.string().min(0).max(100).optional(),
});


//TODO: REGISTER

//TODO: query find bys email or username
const checkRegisterCredentials = async (email, username) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        },
        select:{
            userId: true
        }
    });
    return user;
}
//TODO: query create user
const registerUser = async (data) => {
    const user = await prisma.user.create({
        data: data
    });
    return user;
}

//TODO: LOGIN

//TODO: query find bys email or username

export {userSchema, checkRegisterCredentials, registerUser}