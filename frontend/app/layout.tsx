import type { Metadata } from 'next'
import { Montserrat, Poppins, Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-be-vietnam-pro',
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "PETJAM - Adopt a Pet",
  description: "User-friendly website for pet adoption",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${poppins.variable} ${beVietnamPro.variable} antialiased bg-background font-body`}>
        {children}
      </body>
    </html>
  )
}
