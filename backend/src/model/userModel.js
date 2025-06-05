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

//AUTH
const getUserData = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      username: true,
      email: true,
      role: true,
    },
  });
  return user;
};

//Change ROLE
const changeUserRole = async (userId, role, document, name) => {
  const user = await prisma.user.update({
    where: { userId },
    data: { role, document, name },
  });
  return user;
};

//Change USERNAME
const changeUsername = async (userId, username) => {
  const user = await prisma.user.update({
    where: userId,
    data: {
      username,
    },
  });
  return user;
};

//DELETE
const deleteUser = async (userId) => {
  const user = await prisma.user.delete({
    where: { userId },
  });
  return user;
}
export {
  checkRegisterCredentials,
  registerUser,
  checkLoginCredentials,
  getUserData,
  changeUserRole,
  changeUsername,
  deleteUser
};
