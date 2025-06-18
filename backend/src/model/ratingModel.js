import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createRating(rating, authorId, publicationId) {
  const result = await prisma.rating.create({
    data: {authorId, publicationId, rating}
  });

  return result;
  }

export async function updateRating(rating, authorId, publicationId){
   const result = await prisma.rating.updateMany({
    where: {
      publicationId: Number(publicationId),
      authorId: authorId
    },
    data:  {rating},
   });
   return result
  }

  export async function deleteRating(authorId, publicationId) {
    const result = await prisma.rating.deleteMany({
      where: {
        publicationId: Number(publicationId),
        authorId: authorId,
      },
    });
    return result;
  }

export async function getRatingStatics(){
  
}