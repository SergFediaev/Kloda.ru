'use server'

import type { CardArgs, CardResponse } from '@/services/cards/cards.types'

export async function createCard(card: CardArgs): Promise<CardResponse> {
  try {
    const response = await fetch('http://api.kloda.fediaev.ru/v1/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    })

    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
