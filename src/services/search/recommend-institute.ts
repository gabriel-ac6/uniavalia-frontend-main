import { api } from '../api'

interface RecommendInstituteParams {
  input: object
}

export interface RecommendInstitute {
  institution_name: string
  institution_id: number
  institution_state: string
  institution: number
  campus_id: number
  campus_city: string
  match_score: string
  average_scores: {
    avg_crit_location: number
    avg_crit_service: number
    avg_crit_infrastructure: number
    avg_crit_library: number
    avg_crit_sports: number
    avg_general: number
  }
}

interface CourseSearchResponse {
  institutions: RecommendInstitute[]
}

export async function recommendInstitute({
  input,
}: RecommendInstituteParams): Promise<CourseSearchResponse> {
  const response = await api({
    input: 'search-engine/recommend-institute',
    init: {
      body: JSON.stringify(input),
      method: 'POST',
    },
  })

  const data = await response.json()

  return data
}
