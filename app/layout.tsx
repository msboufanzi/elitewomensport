import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EWS',
  description: 'ELITE WOMENS SPORTS',
  generator: 'EWS.COM',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
