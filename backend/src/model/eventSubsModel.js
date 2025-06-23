import prisma from '../utils/prisma/db.js';

const getSubscription = async (userId) => {
  const subs = await prisma.eventSubscription.findMany({
    where: {
      userId,
    },
    select: {
      Publication: {
        select: {
          image: true,
          video: true,
          title: true,
          eventDate: true,
          publicationId: true,
        },
      },
    },
  });
  return subs || null;
};
const createSubscription = async (userId, publicationId) => {
  const subs = await prisma.eventSubscription.create({
    data: { userId, publicationId },
    select: {
      Publication: {
        select: {
          image: true,
          video: true,
          title: true,
          eventDate: true,
          publicationId: true,
        },
      },
    },
  });
  return subs || null;
};
const deleteSubscrtiption = async (userId, publicationId) => {
  const subs = await prisma.eventSubscription.delete({
    where: {
      publicationId_userId: { userId, publicationId },
    },
  });
  return subs || null;
};
const checkSub = async (userId, publicationId) => {
  const subs = await prisma.eventSubscription.findUnique({
    where: {
      publicationId_userId: { userId, publicationId },
    },
  });
  return subs || null;
};
const listSubs = async (publicationId) => {
  const subs = await prisma.eventSubscription.findMany({
    where: {
      publicationId,
    },
    select: {
      User: {
        select: {
          userId: true,
          userImage: true,
          username: true,
          bio: true,
        },
      },
    },
  });
  return subs || null;
};

export {
  getSubscription,
  createSubscription,
  deleteSubscrtiption,
  checkSub,
  listSubs,
};
