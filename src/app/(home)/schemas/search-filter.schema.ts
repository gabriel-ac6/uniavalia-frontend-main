import { z } from 'zod'

export const searchFilterSchema = z.object({
  course_id: z.string(),
  university_id: z.string().optional(),
  location: z.string().optional(),
  weights: z
    .object({
      location: z.number().optional(),
      services: z.number().optional(),
      infrastructure: z.number().optional(),
      library: z.number().optional(),
      sports: z.number().optional(),
      teachers: z.number().optional(),
      lab: z.number().optional(),
      curriculum: z.number().optional(),
      employability: z.number().optional(),
    })
    .optional(),
})

export type SearchFilterData = z.infer<typeof searchFilterSchema>
