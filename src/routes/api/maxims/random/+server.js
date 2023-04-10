import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const GET = async () => {
  const maxims = await prisma.$queryRaw`SELECT m.maxim, a.author FROM maxims.maxims m join maxims.authors a on (m.id_author = a.id) ORDER BY RAND() LIMIT 1;`;
  return json(maxims)
}

