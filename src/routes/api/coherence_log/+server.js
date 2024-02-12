// @ts-nocheck
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const POST = async ({ url }) => {
  const createdLog = await prisma.coherence_log.create({
    data: {
      played_at: new Date(),
      played_from: url.href
    },
  })

  return json({createdLog})
}

