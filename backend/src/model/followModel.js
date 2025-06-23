import prisma from '../utils/prisma/db.js';

const createSeguindo = async (followingId, followerById) => {
  try {
    const seguindo = await prisma.follows.create({
      data: { followingId, followerById },
    });
    return { success: true, seguindo };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const block = async (followingId, followerById) => {
  try {
    const bloquear = await prisma.follows.delete({
      where: {
        followerById_followingId: { followerById, followingId },
      },
    });
    return { success: true, bloquear };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//folowerbyid = eu(quem esta seguind) following = quem eu quero deixar de seguir
const stopFollow = async (followerById, followingId) => {
  try {
    const pararSeguir = await prisma.follows.delete({
      where: {
        followerById_followingId: { followerById, followingId },
      },
    });
    return { success: true, pararSeguir };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const listFollowing = async (username) => {
  try {
    const following = await prisma.follows.findMany({
      where: {
        following: {
          username: username,
        },
      },
      include: {
        followerBy: {
          select: {
            userId: true,
            username: true,
            bio: true,
            userImage: true,
          },
        },
      },
    });
    return { success: true, following };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const listFollowers = async (username) => {
  try {
    const followers = await prisma.follows.findMany({
      where: {
        followerBy: {
          username: username,
        },
      },
      include: {
        following: {
          select: {
            userId: true,
            username: true,
            bio: true,
            userImage: true,
          },
        },
      },
    });
    return { success: true, followers: followers };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { createSeguindo, block, stopFollow, listFollowing, listFollowers };
