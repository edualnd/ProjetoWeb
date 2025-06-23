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
  return user || null;
};

const registerUser = async (data) => {
  const user = await prisma.user.create({
    data: data,
  });

  return user || null;
};
//Profile

const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { userId },
    include: {
      EventSubscription: {
        select: {
          Publication: {
            select: {
              title: true,
              eventDate: true,
              image: true,
              video: true,
              publicationId: true,
            },
          },
        },
      },
      _count: {
        select: {
          followerBy: true,
          following: true,
        },
      },
      Publication: {
        select: {
          publicationId: true,
          createdAt: true,
          video: true,
          image: true,
          text: true,
          isEvent: true,
          title: true,
          eventDate: true,
          registrationStartDate: true,
          registrationEndDate: true,
          User: {
            select: {
              username: true,
              userId: true,
              userImage: true,
            },
          },
        },
      },
    },

    omit: {
      email: true,
      password: true,
      role: true,
      name: true,
      document: true,
    },
  });
  return user || null;
};

//LOGIN
const checkLoginCredentials = async (data) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: data }, { username: data }],
    },
    select: {
      EventSubscription: {
        select: {
          publicationId: true,
        },
      },
      role: true,
      username: true,
      userImage: true,
      userId: true,
      password: true,
      bio: true,
      Rating: {
        select: {
          publicationId: true,
        },
      },
      following: {
        select: {
          followerBy: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  return user || null;
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
  return user || null;
};

//Change ROLE
const changeUserRole = async (userId, role, document, name) => {
  const user = await prisma.user.update({
    where: { userId },
    data: { role, document, name },
    select: {
      role: true,
      username: true,
      userImage: true,
      userId: true,
      password: true,
      bio: true,
    },
  });
  return user || null;
};

//Edit USER PROFILE
const editUserProfile = async (userId, data) => {
  const user = await prisma.user.update({
    where: { userId },
    data: {
      ...data,
    },
    select: {
      userImage: true,
      username: true,
      bio: true,
    },
  });
  return user || null;
};

const currentUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userImage: true,
      bio: true,
    },
  });
  return user || null;
};

//DELETE
const deleteUser = async (userId) => {
  const user = await prisma.user.delete({
    where: { userId },
  });
  return user || null;
};

//Change PASSWORD
const changePassword = async (userId, password) => {
  const user = await prisma.user.update({
    where: { userId },
    data: {
      password,
    },
  });
  return user || null;
};

//Change EMAIL
const changeEmail = async (userId, email) => {
  const user = await prisma.user.update({
    where: { userId },
    data: {
      email,
    },
  });
  return user || null;
};

//Find profile
const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      _count: {
        select: {
          followerBy: true,
          following: true,
        },
      },
      Publication: {
        select: {
          publicationId: true,
          createdAt: true,
          video: true,
          image: true,
          text: true,
          isEvent: true,
          title: true,
          eventDate: true,
          registrationStartDate: true,
          registrationEndDate: true,
          User: {
            select: {
              username: true,
              userId: true,
              userImage: true,
            },
          },
        },
      },
    },
    omit: {
      email: true,
      password: true,
      role: true,
      name: true,
      document: true,
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
  deleteUser,
  changePassword,
  changeEmail,
  findUserByUsername,
  currentUserProfile,
  editUserProfile,
  getUserProfile,
};
