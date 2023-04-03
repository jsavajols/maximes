import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const GET = async ({ params: { id } }) => {
  const maxims = await prisma.maxims.findMany({
    // where: { id: id },
    include: { author: true },
  })

  return json(maxims)
}

export const DELETE = async ({ params: { id } }) => {
  const deletedPost = await prisma.maxims.delete({
    where: { compteur: Number(id) },
  })

  return json(deletedPost)
}
