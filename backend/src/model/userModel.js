import prisma from '../utils/prisma/db.js';

// REGISTER
const checkRegisteredCredentials = async (email, username) => {
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
    select: {
      document: true,
      name: true,
      username: true,
      role: true,
      email: true,
    },
  });
  return user;
};

//Change USERNAME
const changeUsername = async (userId, username) => {
  const user = await prisma.user.update({
    where: { userId },
    data: {
      username,
    },
  });
  return user;
};

//Edit USER PROFILE
const editUserProfile = async (userId, data) => {
  const user = await prisma.user.update({
    where: { userId },
    data: {
      ...data,
    },
  });
  return user;
};

const currentUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userImage: true,
      bio: true,
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
};

//Change PASSWORD
const changePassword = async (userId, password) => {
  const user = await prisma.user.update({
    where: { userId },
    data: {
      password,
    },
  });
  return user;
};

//Change EMAIL
const changeEmail = async (userId, email) => {
  const user = await prisma.user.update({
    where: { userId },
    data: {
      email,
    },
  });
  return user;
};

//Find profile
const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username },
    omit: {
      email: true,
      password: true,
      role: true,
      name: true,
      document: true,
    },
    include: {
      Publication: true,
      followerBy: true,
      following: true,
    },
  });

  return user || null;
};

export {
  checkRegisteredCredentials,
  registerUser,
  checkLoginCredentials,
  getUserData,
  changeUserRole,
  changeUsername,
  deleteUser,
  changePassword,
  changeEmail,
  findUserByUsername,
  currentUserProfile,
  editUserProfile,
};
