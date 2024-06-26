export function parseReviewValue(originalValue: number | string) {
  const value = Number(originalValue)

  if (value > 4.5) {
    return {
      text: 'Muito bom',
      color: 'bg-success-700',
    }
  }

  if (value > 3.5) {
    return {
      text: 'Bom',
      color: 'bg-success-700',
    }
  }

  if (value > 2.5) {
    return {
      text: 'Neutro',
      color: 'bg-warning-600',
    }
  }

  if (value > 1.5) {
    return {
      text: 'Ruim',
      color: 'bg-danger-700',
    }
  }

  return {
    text: 'Muito ruim',
    color: 'bg-danger-700',
  }
}
