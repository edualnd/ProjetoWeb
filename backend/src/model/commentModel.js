import prisma from '../utils/prisma/db.js'



//Get
const getComment = async (commentId) =>{
  const comment = await prisma.comments.findUnique({
    where:{commentId},
    select:{
      authorId: true,
      Publication: true
    }
  }
)
  return comment;
}
//Create
const createComment = async (data) =>{
  const comment = await prisma.comments.create({
    data
  })
  return comment;
}
//Delete
const deleteComment = async (commentId) =>{
  const comment = await prisma.comments.delete({
    where:{commentId}
  })
  return comment;
}

//Update
const updateComment = async (commentId, data) =>{
  const comment = await prisma.comments.update({
    where:{commentId},
    data
  })
  return comment;
}

export {getComment, createComment, deleteComment,updateComment}