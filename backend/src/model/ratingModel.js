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

export async function getRatingStatistics(publicationId) {
  const id = typeof publicationId === 'string' 
    ? parseInt(publicationId, 10) 
    : publicationId;

  if (isNaN(id)) {
    throw new Error('publicationId deve ser um número válido');
  }

  const ratings = await prisma.rating.findMany({
    where: { 
      publicationId: id
    }
  });

  if (ratings.length === 0) {
    return {
      average: 0,
      total: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }

  const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  const average = parseFloat((sum / ratings.length).toFixed(2));

  const distribution = ratings.reduce((acc, { rating }) => {
    const star = Math.min(5, Math.max(1, Math.round(rating)));
    acc[star]++;
    return acc;
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  return { average, total: ratings.length, distribution };
}

export async function getAllRatings(page = 1, limit = 20) {

  const parsedPage = Math.max(1, parseInt(page));
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit)));
  const skip = (parsedPage - 1) * parsedLimit;

  const ratings = await prisma.rating.findMany({
    skip,
    take: parsedLimit,
    include: {
      User: {
        select: {
          userId: true,
          username: true,
          name: true,
          userImage: true
        }
      },
      Publication: {
        select: {
          publicationId: true,
          title: true,
          text: true
        }
      }
    },
    orderBy: {
      Publication: {
        createdAt: 'desc'
      }
    }
  });

  const totalRatings = await prisma.rating.count();

  const formattedRatings = ratings.map(rating => ({
    publicationId: rating.publicationId,
    authorId: rating.authorId,
    rating: rating.rating,
    user: {
      userId: rating.User.userId,
      username: rating.User.username,
      name: rating.User.name,
      avatar: rating.User.userImage
    },
    publication: {
      publicationId: rating.Publication.publicationId,
      title: rating.Publication.title,
      excerpt: rating.Publication.text?.substring(0, 50) + '...'
    }
  }));

  return {
    ratings: formattedRatings,
    pagination: {
      total: totalRatings,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil(totalRatings / parsedLimit),
      hasNextPage: parsedPage * parsedLimit < totalRatings,
      hasPreviousPage: parsedPage > 1
    }
  };
}