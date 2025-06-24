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
    include: {
      User: {
        select: {
          userId: true,
          username: true,
          userImage: true,
        },
      },
      Rating: {
        select: {
          rating: true,
        },
      },
    },
  });

  return result;
}

export async function update(publicationId, post) {
  const result = await prisma.publication.update({
    where: {
      publicationId: Number(publicationId),
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

export async function getImages(publicationId) {
  const result = await prisma.publication.findFirst({
    where: { publicationId },
    select: {
      image: true,
      video: true,
    },
  });
  return result;
}
export async function createEvent(post) {
  const result = await prisma.publication.create({
    data: post,
    include: {
      User: {
        select: {
          userId: true,
          username: true,
          userImage: true,
        },
      },
      Rating: {
        select: {
          rating: true,
        },
      },
    },
  });
  return result;
}

export async function updateEvent(publicationId, data) {
  const result = await prisma.publication.update({
    where: {
      publicationId: Number(publicationId),
    },
    data: data,
    include: {
      User: {
        select: {
          userId: true,
          username: true,
          userImage: true,
        },
      },
      Rating: {
        select: {
          rating: true,
        },
      },
    },
  });
  return result;
}

export async function deleteEvent(authorId, publicationId) {
  const result = await prisma.publication.delete({
    where: {
      publicationId: Number(publicationId),
      authorId: authorId,
    },
  });
  return result;
}

export async function getEventList() {
  const result = await prisma.publication.findMany({
    where: {
      isEvent: true,
    },
  });
  return result;
}

export async function getCloserEvent() {
  const result = await prisma.publication.findMany({
    where: {
      isEvent: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 8,
  });
  return result;
}

export async function getAllPostsVisitor(page = 1, limit = 20) {
  try {
    const posts = await prisma.publication.findMany({
      include: {
        User: {
          select: {
            userId: true,
            username: true,
            userImage: true,
          },
        },
        Rating: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const postsWithAvg = posts.map((post) => {
      const ratings = (post.Rating || []).map((r) => r.rating);
      const avg =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : null;

      return {
        ...post,
        avgRating: avg == null ? 0 : avg,
      };
    });
    return postsWithAvg;
  } catch (error) {
    console.error('Database error in getAllPostsVisitor:', error);
    throw new Error('Falha ao buscar publicações no banco de dados');
  }
}
