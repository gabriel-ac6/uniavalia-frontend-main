import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { serviceAuthLogin } from '@/services/auth/login'

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null
          }

          const response = await serviceAuthLogin({
            input: {
              email: credentials.email,
              password: credentials.password,
            },
          })

          return response
        } catch (error) {
          console.error('Error :>> ', error)
          return null
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
