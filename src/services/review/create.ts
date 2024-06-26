import { ReviewCreateData } from '@/schemas/review'

import { api } from '../api'

interface ServiceReviewCreateParams {
  input: ReviewCreateData
}

export async function serviceReviewCreate({
  input,
}: ServiceReviewCreateParams) {
  console.log(`institution_id: ${ Number(input.institution_id)}, type: ${typeof input.institution_id}`)
  console.log(`campus_id: ${ Number(input.campus_id)}, type: ${typeof input.campus_id}`)
  console.log(`course_id: ${ Number(input.course_id)}, type: ${typeof input.course_id}`)
  console.log(`crit_teachers: ${input.crit_teachers}, type: ${typeof input.crit_teachers}`)
  console.log(`crit_lab: ${input.crit_lab}, type: ${typeof input.crit_lab}`)
  console.log(`crit_curriculum: ${input.crit_curriculum}, type: ${typeof input.crit_curriculum}`)
  console.log(`crit_employability: ${input.crit_employability}, type: ${typeof input.crit_employability}`)
  console.log(`crit_location: ${input.crit_location}, type: ${typeof input.crit_location}`)
  console.log(`crit_service: ${input.crit_service}, type: ${typeof input.crit_service}`)
  console.log(`crit_infrastructure: ${input.crit_infrastructure}, type: ${typeof input.crit_infrastructure}`)
  console.log(`crit_sports: ${input.crit_sports}, type: ${typeof input.crit_sports}`)
  console.log(`crit_library: ${input.crit_library}, type: ${typeof input.crit_library}`)
  console.log(`title: ${input.title}, type: ${typeof input.title}`)
  console.log(`description: ${input.description}, type: ${typeof input.description}`)  
  const response = await api({
    input: 'review/insert',
    init: {
      body: JSON.stringify({
        institution_id: Number(input.institution_id),
        campus_id: Number(input.campus_id),
        course_id: Number(input.course_id),
        crit_teachers: input.crit_teachers,
        crit_lab: input.crit_lab,
        crit_curriculum: input.crit_curriculum,
        crit_employability: input.crit_employability,
        crit_location: input.crit_location,
        crit_service: input.crit_service,
        crit_infrastructure: input.crit_infrastructure,
        crit_sports: input.crit_sports,
        crit_library: input.crit_library,
        title: input.title,
        description: input.description,
      }),
      method: 'POST',
    },
  })

  const data = await response.json()

  return data
}
