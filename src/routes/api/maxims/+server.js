// @ts-nocheck
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

// curl -X POST http://localhost:5173/api/maxims -H "Content-Type: application/json" -d '{"id_author": "Nelson Mandela", "maxim": "Un leader est comme un berger. Il reste derrière le troupeau, laissant les plus adroits aller devant, après quoi les autres suivent sans réaliser que, tout le long, ils ont été dirigés par-derrière"}'  
export const POST = async ({ request }) => {
  let author_id;
  const { author, maxim } = await request.json();
  if (author === undefined || author === null || author.length === 0) {
    return json({ error: 'Author name is required' })
  }
  if (maxim === undefined || maxim === null || maxim.length === 0) {
    return json({ error: 'Maxim is required' })
  }
  let returnedAuthors = await prisma.authors.findMany({
    where: { Id: author },
  });
  if (returnedAuthors.length === 0) {
    // Create author
    if (author.length > 20) {
      author_id = author.substring(0, 20)
    } else {
      author_id = author
    }
    await prisma.authors.create({
      data: {
        Id: author_id,
        author: author,
      },
    })
  } else {
    author_id = returnedAuthors[0].Id;
  }
  const createdMaxim = await prisma.maxims.create({
    data: {
      Id_author: author_id,
      maxim: maxim,
    },
  })

  return json({createdMaxim})
}

export const PUT = async ({ request }) => {
  const { Id, author, maxim } = await request.json();
  const updatedMaxim = await prisma.maxims.update({
      where: { compteur: Number(Id) },
      data: {
          Id_author: author,
          maxim: maxim,
      },
  })
  return json(updatedMaxim)
}

export const GET = async () => {
  const maxims = await prisma.$queryRaw`SELECT m.*, author.author FROM maxims.maxims m left join maxims.authors author on (m.id_author = author.id) where author.Id  is not null;`;
  /*
  const maxims = await prisma.maxims.findMany({
    // where: { author["Id"]: "Jérôme Savajols" },
    include: { author: true },
  })
  */
  return json(maxims)
}

