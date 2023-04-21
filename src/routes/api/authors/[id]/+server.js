// @ts-nocheck
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const DELETE = async ({ params: { id } }) => {
  try {
    const deletedAuthor = await prisma.authors.delete({
      where: { compteur: Number(id) },
    })
  } catch (e) {
    return json({ error: e.meta })
  }
  return json(deletedAuthor)
}

export const GET = async ({ params: { id } }) => {
  try {
    let author;
    author = await prisma.authors.findUnique({
      where: { compteur: Number(id) },
      include: { maxims: true },
    })
  } catch (e) {
    return json({ error: e.meta })
  }
  return json(author)
}
