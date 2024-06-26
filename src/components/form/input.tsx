/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { WarningCircle } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import { ComponentProps, ReactNode, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { LoginData, RegisterData, ResetPasswordData } from '@/schemas/auth'

import { Flex } from '../flex'
import { Label } from './label'
import { PasswordInputEyeIcon } from './password-input-eye-icon'

type AvailableIds = LoginData & RegisterData & ResetPasswordData

interface InputProps extends ComponentProps<'input'> {
  id: keyof AvailableIds
  rightIcon?: ReactNode
  leftIcon?: ReactNode
}

export function Input({
  className,
  id,
  children,
  rightIcon,
  leftIcon,
  type: originalType = 'text',
  ...rest
}: InputProps) {
  const [type, setType] = useState(originalType)

  const {
    formState: { errors },
    register,
    clearErrors,
  } = useFormContext<AvailableIds>()

  return (
    <Label htmlFor={id}>
      {children}

      <div>
        <Flex
          row
          className={clsx(
            'group',
            'items-center gap-2',
            'w-full',
            'px-[9px] py-2',
            'font-sans font-normal',
            'text-base text-black',
            'placeholder:text-black-secondary',
            'bg-white',
            'border rounded-lg',
            'focus-within:ring-primary-700 focus-within:border-primary-700',
            errors?.[id] ? 'border-red-700' : 'border-neutral-300',
            className,
          )}
        >
          {leftIcon}
          <input
            id={id}
            className={clsx(
              'w-full outline-0 border-0 p-0 ring-0 focus:border-0 focus:ring-0',
            )}
            type={type}
            {...register(id, {
              onBlur: () => {
                clearErrors?.(id)
              },
            })}
            {...rest}
          />
          {originalType === 'password' ? (
            <PasswordInputEyeIcon setType={setType} />
          ) : (
            rightIcon
          )}
        </Flex>

        {errors?.[id] ? (
          <p
            className={clsx(
              'mt-1 p-1',
              'text-black text-xs',
              'font-light leading-[115%]',
              'bg-red-100 rounded',
              'flex flex-row gap-1 items-center',
            )}
          >
            <WarningCircle size={16} className="text-red-700" />
            {errors[id]?.message}
          </p>
        ) : (
          <></>
        )}
      </div>
    </Label>
  )
}
