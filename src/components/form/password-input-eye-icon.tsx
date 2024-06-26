'use client'

import { EyeSlash } from '@phosphor-icons/react'
import { Eye } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'

interface PasswordInputEyeIconProps {
  setType(type: string): void
}

export function PasswordInputEyeIcon({ setType }: PasswordInputEyeIconProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <button
      type="button"
      onClick={() =>
        setShowPassword((prevState) => {
          const shouldShow = !prevState

          if (shouldShow === true) {
            setType('text')
          } else {
            setType('password')
          }

          return shouldShow
        })
      }
    >
      {showPassword ? (
        <Eye size={16} className="text-black-secondary" />
      ) : (
        <EyeSlash size={16} className="text-black-secondary" />
      )}
    </button>
  )
}
