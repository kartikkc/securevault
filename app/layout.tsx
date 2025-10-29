import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'SecureVault - Advanced Password Manager',
  description: 'The most advanced password manager with military-grade encryption, seamless sync, and intelligent security monitoring.',
  keywords: ['password manager', 'security', 'encryption', 'digital vault'],
  authors: [{ name: 'SecureVault Team' }],
  openGraph: {
    title: 'SecureVault - Advanced Password Manager',
    description: 'Secure your digital life with military-grade encryption',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-background transition-colors duration-300">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}