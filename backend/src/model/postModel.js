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
  });
  return result;
}

export async function updateEvent(authorId, publicationId, post) {
  const result = await prisma.publication.update({
    where: {
      publicationId: Number(publicationId),
      authorId: authorId,
      isEvent: true,
    },
    data: { post },
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
  // if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
  //   throw new Error('Parâmetros de paginação inválidos');
  // }

  // const parsedPage = Math.max(1, parseInt(page));
  // const parsedLimit = Math.min(100, Math.max(1, parseInt(limit)));
  // const skip = (parsedPage - 1) * parsedLimit;

  try {
    const posts = await prisma.publication.findMany({
      // skip,
      // take: parsedLimit,
      include: {
        User: {
          select: {
            userId: true,
            username: true,
            userImage: true,
          },
        },

        // _count: {
        //   select: {
        //     Comments: true,
        //     Rating: true,
        //   },
        // },

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

    // const totalPosts = await prisma.publication.count();

    // const formattedPosts = posts.map((post) => {
    //   const averageRating =
    //     post.Rating.length > 0
    //       ? parseFloat(
    //           (
    //             post.Rating.reduce((sum, r) => sum + r.rating, 0) /
    //             post.Rating.length
    //           ).toFixed(2),
    //         )
    //       : 0;

    // {
    //     publicationId: post.publicationId,
    //     title: post.title,
    //     text: post.text,
    //     image: post.image,
    //     video: post.video,
    //     isEvent: post.isEvent,
    //     eventDate: post.eventDate,
    //     registrationStartDate: post.registrationStartDate,
    //     registrationEndDate: post.registrationEndDate,
    //     createdAt: post.createdAt,
    //     author: {
    //       userId: post.User.userId,
    //       username: post.User.username,
    //       name: post.User.name,
    //       avatar: post.User.userImage,
    //     },
    //     stats: {
    //       commentsCount: post._count.Comments,
    //       ratingsCount: post._count.Rating,
    //       averageRating,
    //     },
    //   };
    //})
    return posts;

    return {
      posts: formattedPosts,
      pagination: {
        total: totalPosts,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(totalPosts / parsedLimit),
        hasNextPage: parsedPage < Math.ceil(totalPosts / parsedLimit),
        hasPreviousPage: parsedPage > 1,
      },
    };
  } catch (error) {
    console.error('Database error in getAllPostsVisitor:', error);
    throw new Error('Falha ao buscar publicações no banco de dados');
  }
}
