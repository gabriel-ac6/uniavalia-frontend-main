'use client'

import { deleteCookie, getCookie } from 'cookies-next'
import { signOut } from 'next-auth/react'

import { API_URL } from '@/constants/api-url.const'
import { CookiesTokensEnum } from '@/constants/cookies-tokens'

export const api = async ({
  input,
  init,
}: {
  input: string | URL | Request
  init?: RequestInit | undefined
}): Promise<Response> => {
  const jwt = getCookie(CookiesTokensEnum['@uniavalia/token'])

  const response = await fetch(`${API_URL}/${input}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      ...init?.headers,
      ...(jwt && { Authorization: `Bearer ${jwt}` }),
    },
  })

  if (response.status === 401) {
    deleteCookie(CookiesTokensEnum['@uniavalia/token'])
    signOut()
  }

  return response
}
