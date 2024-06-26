import { z } from 'zod'

export const stringRequired = z
  .string({
    required_error: 'Obrigatório',
  })
  .min(1, {
    message: 'Obrigatório',
  })
