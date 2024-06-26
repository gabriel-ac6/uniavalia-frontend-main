import { zodResolver } from '@hookform/resolvers/zod'
import { ComponentProps } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { ZodSchema } from 'zod'

interface FormProps<T> extends ComponentProps<'form'> {
  schema?: ZodSchema
  submitFunction: (data: T) => void
}

export function Form<T extends FieldValues>({
  schema,
  submitFunction,
  children,
  ...rest
}: FormProps<T>) {
  const methods = useForm<T>({
    ...(schema && { resolver: zodResolver(schema) }),
  })

  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitFunction)} {...rest}>
        {children}
      </form>
    </FormProvider>
  )
}
