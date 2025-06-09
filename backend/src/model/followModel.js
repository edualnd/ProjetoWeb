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
export { createSeguindo };
