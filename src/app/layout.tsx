import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Boulaayoune Car | Location de Voitures à Agadir',
  description: 'Réservez en ligne & économisez. Les meilleures voitures de location à l\'Aéroport Al Massira et Agadir. Tarifs tout compris.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  )
}
