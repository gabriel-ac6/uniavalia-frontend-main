type FillType = ('full' | 'none' | 'half')[]

export function getStarFillType(average: number) {
  const sequence = [] as FillType

  for (let index = 1; index <= 5; index++) {
    const result = average - index

    if (result >= 0) {
      sequence.push('full')
      continue
    }

    if (result >= -0.7) {
      sequence.push('half')
      continue
    }

    sequence.push('none')
    continue
  }

  return sequence
}
