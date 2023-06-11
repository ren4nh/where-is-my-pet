import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <main
        className={`flex min-h-screen items-center p-24 ${inter.className}`}
      >
        <Component {...pageProps} />
      </main>
    </SessionProvider>);
}
