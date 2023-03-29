import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

// curl -X POST http://localhost:5173/api/maxims -H "Content-Type: application/json" -d '{"id_author": "Nelson Mandela", "maxim": "Un leader est comme un berger. Il reste derrière le troupeau, laissant les plus adroits aller devant, après quoi les autres suivent sans réaliser que, tout le long, ils ont été dirigés par-derrière"}'  
export const POST = async ({ request }) => {
  const { id_author, maxim } = await request.json()
  const createdMaxim = await prisma.maxims.create({
    data: {
      Id_author: id_author,
      maxim: maxim,
    },
  })

  return json(createdMaxim)
}

export const GET = async () => {
  const maxims = await prisma.maxims.findMany({
    // where: { Id_author: "Jérôme Savajols" },
    include: { author: true },
  })

  return json(maxims)
}

