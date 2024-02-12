// @ts-nocheck
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const GET = async () => {
    let users;
    users = await prisma.users.findMany({
        orderBy: [
            {
                user: 'asc',
            },
        ],
    })

    return json(users)
}

export const POST = async ({ request }) => {
    let user;
    if (request.method) {
         ({ user } = await request.json());
    } else {
        user = request.user;
    }
    let Id;
    let createdusers;
    if (user === undefined || user === null || user.length === 0) {
        return json({ error: 'User name is required' })
    }
    if (user.length > 20) {
        Id = user.substring(0, 20)
    } else {
        Id = user
    }

    try {
        createdusers = await prisma.users.create({
            data: {
                Id: Id,
                user: user,
            },
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            return json({ error: 'User already exists' })
        }

    }

    return json(createdusers)
}

export const PUT = async ({ request }) => {
    let Id;
    let user;
    if (request.method) {
         ({ Id, user } = await request.json());
    } else {
        Id = request.Id;
        user = request.user;
    }
    const updatedusers = await prisma.users.update({
        where: { compteur: Id },
        data: {
            user: user,
        },
    })

    return json(updatedusers)
}
