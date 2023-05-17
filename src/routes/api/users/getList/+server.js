// @ts-nocheck
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const GET = async () => {
    let users;
    users = await prisma.users.findMany({
        select: {
            Id: true,
            user: true,
        },
        orderBy: [
            {
                user: 'asc',
            },
        ],
    })

    return json(users)
}
