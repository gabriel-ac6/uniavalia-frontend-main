import { z } from 'zod'

export const reviewCreateSchema = z.object({
  institution_id: z.string(),
  campus_id: z.string(),
  course_id: z.string(),
  crit_teachers: z.number(),
  crit_lab: z.number(),
  crit_curriculum: z.number(),
  crit_employability: z.number(),
  crit_location: z.number(),
  crit_service: z.number(),
  crit_infrastructure: z.number(),
  crit_sports: z.number(),
  crit_library: z.number(),
  title: z.string(),
  description: z.string(),
})

export type ReviewCreateData = z.infer<typeof reviewCreateSchema>
