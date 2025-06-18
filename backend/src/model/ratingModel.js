import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createRating(rating, authorId, publicationId) {
  const result = await prisma.rating.create({
    data: {authorId, publicationId, rating}
  });

  return result;
  }

