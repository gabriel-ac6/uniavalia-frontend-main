import { Star } from '@/components/icons/star'

import { getStarFillType } from '../utils/getStarFillType'

interface StarsProps {
  average: number
  size?: number
}

export function Stars({ average, size }: StarsProps) {
  const starFill = getStarFillType(average)

  return starFill.map((fillType, index) => (
    <Star key={index} size={size} fill={fillType} />
  ))
}
