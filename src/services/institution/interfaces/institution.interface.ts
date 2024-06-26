import { Campus } from './campus.interface'

export interface Institution {
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
  campuses: Campus[]
}
