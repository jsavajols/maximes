// @ts-nocheck
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const DELETE = async ({ params: { id } }) => {
  const deletedAuthor = await prisma.authors.delete({
    where: { compteur: Number(id) },
  })

  return json(deletedAuthor)
}

export const GET = async ({ params: { id } }) => {
  let author;
  author = await prisma.authors.findUnique({
    where: { compteur: Number(id) },
    include: { maxims: true },
  })

  return json(author)
}
