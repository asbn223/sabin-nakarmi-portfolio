import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space-grotesk' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sabin Nakarmi | Senior Flutter Developer & Lead',
  description: 'Senior Flutter Developer and Team Lead with expertise in cross-platform mobile development, team leadership, and scalable architecture. Based in Kathmandu, Nepal.',
  keywords: ['Flutter', 'Mobile Developer', 'Dart', 'Leadership', 'Full Stack'],
  authors: [{ name: 'Sabin Nakarmi' }],
  openGraph: {
    title: 'Sabin Nakarmi | Senior Flutter Developer & Lead',
    description: 'Senior Flutter Developer with expertise in cross-platform mobile development and team leadership.',
    url: 'https://sabin-nakarmi.com',
    siteName: 'Sabin Nakarmi',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} style={{ colorScheme: 'dark' }}>
      <body className="font-inter bg-background text-foreground antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
