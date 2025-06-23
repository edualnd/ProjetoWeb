import prisma from '../../prisma/db.js';

const createSession = async (data) => {
  const session = await prisma.session.create({
    data: data,
  });
  return session || null;
};

const findSession = async (deviceId) => {
  const session = await prisma.session.findFirst({
    where: {
      deviceId,
    },
  });
  return session || null;
};

const deleteSession = async (deviceId) => {
  const session = await prisma.session.deleteMany({
    where: {
      deviceId,
    },
  });
  return session || null;
};

const deleteAllSessions = async (userId) => {
  const session = await prisma.session.deleteMany({
    where: {
      userId,
    },
  });
  return session;
};
const deleteExpiredSession = async (userId) => {
  const session = await prisma.session.deleteMany({
    where: {
      AND: [{ userId }, { expiredAt: { lt: new Date() } }],
    },
  });
  return session;
};

export {
  createSession,
  findSession,
  deleteSession,
  deleteAllSessions,
  deleteExpiredSession,
};
