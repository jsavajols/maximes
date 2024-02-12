// @ts-nocheck
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { json } from '@sveltejs/kit'

export const POST = async ({ request }) => {
  const { card } = await request.json();
  if (card === undefined || card === null || card.length === 0) {
    return json({ error: 'Card is required' })
  }
  const createdCard = await prisma.cards.create({
    data: {
      card_text: card,
    },
  })

  return json({createdCard})
}

export const PUT = async ({ request }) => {
  const { Id, card } = await request.json()
  const updatedCard = await prisma.cards.update({
      where: { compteur: Number(Id) },
      data: {
        card_text: card,
      },
  })

  return json(updatedCard)
}

export const GET = async () => {
  const cards = await prisma.cards.findMany({
  })

  return json(cards)
}

