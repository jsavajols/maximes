// @ts-nocheck
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const DELETE = async ({ params: { id } }) => {
  const deleteduser = {};
  try {
    deleteduser = await prisma.users.delete({
      where: { compteur: Number(id) },
    });
  } catch (e) {
    return json({ error: e.meta })
  }
  return json(deleteduser)
}

export const GET = async ({ params }) => {
  let user;
  try {
    user = await prisma.users.findUnique({
      where: { compteur: Number(id) },
    })
  } catch (e) {
    return json({ error: e.meta })
  }
  return json(user)
}
