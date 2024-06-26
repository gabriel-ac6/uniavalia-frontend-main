import { RecentReview } from './recent-review'

export interface Courses {
  course_id_ies: number
  course_id: number
  course_name: string
}

export interface CampusInfo {
  institution_name: string
  campus_name: string
  average_scores: {
    avg_crit_location: string
    avg_crit_service: string
    avg_crit_infrastructure: string
    avg_crit_library: string
    avg_crit_sports: string
    avg_general: string
  }
  review_count: number
  campus_city: string
  institution_state: string
  courses: Courses[]
  institution_link: string | null
  course_recent_reviews: RecentReview[]
}
