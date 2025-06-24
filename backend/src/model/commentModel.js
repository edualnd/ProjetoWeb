import prisma from '../utils/prisma/db.js';

//Get comment data (authorId, publicationAuthor)
const getCommentData = async (commentId) => {
  const comment = await prisma.comments.findUnique({
    where: { commentId },
    select: {
      authorId: true,
      Publication: true,
    },
  });
  return comment;
};
//Get comment
const getComment = async (publicationId) => {
  const comment = await prisma.comments.findMany({
    where: { publicationId },
    select: {
      comment: true,
      commentId: true,
      createdAt: true,
      publicationId: true,
      User: {
        select: { username: true, userId: true, userImage: true },
      },
    },
  });
  return comment;
};

//Create
const createComment = async (data) => {
  const comment = await prisma.comments.create({
    data,
    select: {
      comment: true,
      commentId: true,
      createdAt: true,
      publicationId: true,
      User: {
        select: { username: true, userId: true },
      },
    },
  });
  return comment;
};
//Delete
const deleteComment = async (commentId) => {
  const comment = await prisma.comments.delete({
    where: { commentId },
  });
  return comment;
};

//Update
const updateComment = async (commentId, data) => {
  const comment = await prisma.comments.update({
    where: { commentId },
    data,
  });
  return comment;
};

export {
  getCommentData,
  getComment,
  createComment,
  deleteComment,
  updateComment,
};
