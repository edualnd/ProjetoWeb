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
        followerById_followingId: {followerById, followingId}
      },
    });
    return { success: true, bloquear};
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const stopFollow = async (followingId, followerById) => {
  try {
    const bloquear = await prisma.follows.delete({
       where: {
        followerById_followingId: {followerById, followingId}
      },
    });
    return { success: true, bloquear};
  } catch (error) {
    return { success: false, error: error.message };
  }
};


export {createSeguindo, block};