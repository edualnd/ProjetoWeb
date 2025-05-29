import prisma from '../prisma/db.js';

const createSession = async (data) => {
  const session = await prisma.session.create({
    data: data,
  });
  return session;
};

const findSession = async (deviceId, sessionId) => {
  const session = await prisma.session.findFirst({
    where: {
      AND: [{ deviceId }, { sessionId }],
    },
  });
  return session;
};

const deleteSession = async (deviceId) => {
  try{
    const session = await prisma.session.deleteMany({
      where: {
        deviceId,
      },
    });
    return session
  }catch(e){
    return false
  }
  
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
