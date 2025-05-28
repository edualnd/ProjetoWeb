import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export async function create(post){
    const result = await prisma.publication.create({
        data: post
    })

    return result
}