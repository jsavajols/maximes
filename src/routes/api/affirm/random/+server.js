import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const GET = async () => {
  const cards = await prisma.$queryRaw`SELECT a.affirmation FROM maxims.affirmations a ORDER BY RAND() LIMIT 1;`;
  return json(cards)
}

