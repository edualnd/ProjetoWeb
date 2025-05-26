import prisma from '../utils/prisma/db.js';

// REGISTER
const checkRegisterCredentials = async (email, username) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
    select: {
      userId: true,
    },
  });
  return user;
};

const registerUser = async (data) => {
  const user = await prisma.user.create({
    data: data,
  });

  return user;
};

//LOGIN
const checkLoginCredentials = async (data) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: data }, { username: data }],
    },
  });
  return user;
};

export { checkRegisterCredentials, registerUser, checkLoginCredentials };
