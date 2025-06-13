import { PrismaClient } from '@prisma/client';
import postSchema from '../schemas/postSchema.js';

const prisma = new PrismaClient();

export const postValidator = (post, partial = null) => {
  if (partial) {
    return postSchema.partial(partial).safeParse(post);
  }
  return postSchema.safeParse(post);
};

export async function create(post) {
  const result = await prisma.publication.create({
    data: post,
  });

  return result;
}

export async function update(authorId, publicationId, post) {
  const result = await prisma.publication.update({
    where: {
      publicationId: Number(publicationId),
      authorId: authorId,
    },
    data: post,
  });
  return result;
}

export async function deletePost(authorId, publicationId) {
  const result = await prisma.publication.delete({
    where: {
      publicationId: Number(publicationId),
      authorId: authorId,
    },
  });
  return result;
}

export async function getList() {
  const result = await prisma.publication.findMany();
  return result;
}

export async function createEvent(post) {
  const result = await prisma.publication.create({
    data: post,
  });
  return result;
}
