import { z } from 'zod'

export const complaintCreateSchema = z.object({
  review_id: z.number(),
  reason: z.string(),
})

export type ComplaintCreateData = z.infer<typeof complaintCreateSchema>
