// @ts-nocheck
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

/* Here is the explanation for the code above:
1. We import the Prisma client from our database.
2. We define the GET method and its async handler.
3. We define a variable called param, and we get the value of the query parameter called get.
4. We check if the param is null, and if it is, we set it to all.
5. We use the Prisma client to get all the authors if the param is all, or if it is not, we get just the author with the ID of the param.
6. We return the JSON data. */
export const GET = async () => {
    let authors;
    authors = await prisma.authors.findMany({
        select: {
            Id: true,
            author: true,
        },
        orderBy: [
            {
                author: 'asc',
            },
        ],
    })

    return json(authors)
}
