import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const GET = async ({ params: { id } }) => {
  const cards = await prisma.cards.findUnique({
    where: { compteur: Number(id) },
  })

  return json(cards)
}

export const DELETE = async ({ params: { id } }) => {
  const deletedMaxim = await prisma.cards.delete({
    where: { compteur: Number(id) },
  })

  return json(deletedMaxim)
}
