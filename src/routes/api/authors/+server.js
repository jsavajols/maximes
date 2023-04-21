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
        include: { maxims: true },
        orderBy: [
            {
                author: 'asc',
            },
        ],
    })

    return json(authors)
}

// curl -X POST http://localhost:5173/api/authors -H "Content-Type: application/json" -d '{"author": "Jérôme Savajols"}'
/* The code above does the following, explained in English:
1. GET the author's name from the request body
2. If the author's name is longer than 20 characters, then take the first 20 characters and use them as the ID. If it's 20 or less characters, then use the name as the ID
3. Create a new author in the database with the ID and name. (Note that the name is not required to be unique, so if the user enters the same name twice, it will create two entries in the database. This is fine for this project)
4. Return the new author in the response body */
// @ts-ignore
export const POST = async ({ request }) => {
    let author;
    if (request.method) {
         ({ author } = await request.json());
    } else {
        author = request.author;
    }
    let Id;
    let createdAuthors;
    if (author === undefined || author === null || author.length === 0) {
        return json({ error: 'Author name is required' })
    }
    if (author.length > 20) {
        Id = author.substring(0, 20)
    } else {
        Id = author
    }

    try {
        createdAuthors = await prisma.authors.create({
            data: {
                Id: Id,
                author: author,
            },
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            return json({ error: 'Author already exists' })
        }

    }

    return json(createdAuthors)
}

// curl -X PUT http://localhost:5173/api/authors -H "Content-Type: application/json" -d '{"Id": "Jérôme Savajols", "author": "Jérôme Savajols**"}'  
/* Here is the explanation for the code above:
1. We first define the endpoint, which will be PUT.
2. We then define the function. In this case, we will update the author's name.
3. We then define the request, which will be a JSON value containing the author's Id and their new name.
4. We then update the author's name in the authors table.
5. We then return the updated authors table. */
export const PUT = async ({ request }) => {
    let Id;
    let author;
    if (request.method) {
         ({ Id, author } = await request.json());
    } else {
        Id = request.Id;
        author = request.author;
    }
    const updatedAuthors = await prisma.authors.update({
        where: { compteur: Id },
        data: {
            author: author,
        },
    })

    return json(updatedAuthors)
}
