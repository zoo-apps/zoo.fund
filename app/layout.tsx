import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://zoo.fund'),
  alternates: { canonical: '/' },
  title: 'Zoo Fund',
  description: 'Research DAOs raise on-chain for one named question, and publish what they find.',
  // Without these the site shares as a naked URL — no name, no description,
  // no card — which is the state it was in. Next emits og: tags only for what
  // is declared here; a title and description alone do not produce them.
  openGraph: {
    type: 'website',
    siteName: 'Zoo Fund',
    title: 'Zoo Fund',
    description: 'Research DAOs raise on-chain for one named question, and publish what they find.',
    url: 'https://zoo.fund',
    images: [{ url: '/logos/logo-512.png', width: 512, height: 512, alt: 'Zoo' }],
  },
  twitter: {
    card: 'summary',
    site: '@zoo_labs',
    title: 'Zoo Fund',
    description: 'Research DAOs raise on-chain for one named question, and publish what they find.',
    images: ['/logos/logo-512.png'],
  },
  icons: {
    icon: [
      { url: 'https://zoo.ngo/favicon/favicon-32x32.png', sizes: '32x32' },
      { url: 'https://zoo.ngo/favicon/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: 'https://zoo.ngo/favicon/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
