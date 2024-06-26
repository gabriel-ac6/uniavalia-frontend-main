import { ComplaintCreateData } from '@/schemas/complaint'
import { api } from '../api'

interface ServiceComplaintCreateParams {
  input: ComplaintCreateData
}

export async function serviceComplaintCreate({
  input,
}: ServiceComplaintCreateParams) {
  console.log(input.review_id)
  console.log(input.reason)
  const response = await api({
    input: 'complaint/insert',
    init: {
      body: JSON.stringify({
        reviewId: input.review_id,
        reason: input.reason,
      }),
      method: 'POST',
    },
  })
  console.log(response)

  const data = await response.json()

  return data
}
