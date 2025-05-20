import './globals.css'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Memory Game',
  description: 'Joc de memòria amb Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca">
      <body className={inter.className}>
        <Header />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
