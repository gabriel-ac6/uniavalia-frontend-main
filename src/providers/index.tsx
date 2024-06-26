import { CookiesProvider } from 'next-client-cookies/server'

import { ReactQueryProvider } from './react-query-provider'
import { ReactToastifyProvider } from './react-toastify-provider'
import { SessionProvider } from './session-provider'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <CookiesProvider>
        <SessionProvider>{children}</SessionProvider>
      </CookiesProvider>
      <ReactToastifyProvider />
    </ReactQueryProvider>
  )
}
