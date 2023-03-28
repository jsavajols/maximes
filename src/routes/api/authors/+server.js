import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const GET = async ({ request, url }) => {
    let authors;
    let param = url.searchParams.get('get');
    param = param === null ? 'all' : param;
    if (param === 'all') {
        authors = await prisma.authors.findMany({
            include: { maxims: true },
        })
    } else {
        authors = await prisma.authors.findUnique({
            where: { Id: param },
            include: { maxims: true },
        })
    }

    return json(authors)
}

// curl -X POST http://localhost:5173/api/authors -H "Content-Type: application/json" -d '{"author": "Jérôme Savajols"}'  
export const POST = async ({ request }) => {
    const { author } = await request.json()
    let Id;
    if (author.length > 20) {
        Id = author.substring(0, 20)
    } else {
        Id = author
    }
    const createdAuthors = await prisma.authors.create({
        data: {
            Id: Id,
            author: author,
        },
    })

    return json(createdAuthors)
}

// curl -X PUT http://localhost:5173/api/authors -H "Content-Type: application/json" -d '{"Id": "Jérôme Savajols", "author": "Jérôme Savajols**"}'  
export const PUT = async ({ request }) => {
    const { Id, author } = await request.json()
    const updatedAuthors = await prisma.authors.update({
        where: { Id: Id },
        data: {
            author: author,
        },
    })

    return json(updatedAuthors)
}
