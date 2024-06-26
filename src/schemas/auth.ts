import { cnpj, cpf } from 'cpf-cnpj-validator'

import { z } from '@/lib/br-zod'
import { stringRequired } from '@/schemas/generics/string-required'

export const loginSchema = z.object({
  email: stringRequired
    .email({
      message: 'Digite um e-mail válido',
    })
    .transform((email) => email.toLocaleLowerCase()),
  password: stringRequired
    .min(8, { message: 'Mínimo de 8 caracteres' })
    .max(255),
})

export type LoginData = z.infer<typeof loginSchema>

export const registerSchema = loginSchema
  .extend({
    name: stringRequired.includes(' ', {
      message: 'Nome e Sobrenome',
    }),
    password_confirmation: stringRequired
      .min(8, { message: 'Mínimo de 8 caracteres' })
      .max(255),
    cpf: stringRequired
      .refine((doc) => {
        const isValid = cpf.isValid(doc)
        return isValid
      }, 'CPF inválido.')
      .transform((cpf) => cnpj.strip(cpf)),
    dob: stringRequired,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não coincidem',
    path: ['password_confirmation'],
  })

export type RegisterData = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
  email: stringRequired
    .email({
      message: 'Digite um e-mail válido',
    })
    .transform((email) => email.toLowerCase()),
})

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    token: z.string().optional(),
    password: stringRequired
      .min(8, { message: 'Mínimo de 8 caracteres' })
      .max(255),
    password_confirmation: stringRequired
      .min(8, { message: 'Mínimo de 8 caracteres' })
      .max(255),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não coincidem',
    path: ['password_confirmation'],
  })

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
