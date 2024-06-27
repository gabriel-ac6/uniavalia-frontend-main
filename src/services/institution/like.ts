// src/services/reactType.service.ts
import { api } from '../api'

interface ServiceUpdateReactTypeParams {
  reviewId: number
  reactType: number
}

export async function serviceUpdateReactType({
  reviewId,
  reactType,
}: ServiceUpdateReactTypeParams) {
  const response = await api({
    input: `review/react/${reviewId}`, // Usar o reviewId na URL
    init: {
      body: JSON.stringify({ reactType }),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  })

  console.log('Response status:', response.status)
  console.log('Response body:', await response.text())

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data = await response.json()
  return data
}
