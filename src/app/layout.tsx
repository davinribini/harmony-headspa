import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

// ─────────────────────────────────────────────────────────────────────────────
// Metadata — Next.js 14 static export
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://www.harmonyheadspa.se'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Harmony Headspa | Japansk Skalpmassage & Ritual i Stockholm',
    template: '%s | Harmony Headspa Stockholm',
  },

  description:
    'Exklusiv japansk headspa-ritual i Hornsberg, Stockholm. Upplev djupgående skalpmassage, ångbehandling och total avslappning. Boka din signaturbehandling direkt.',

  keywords: [
    'Exklusivt Headspa Stockholm',
    'Skalpmassage för kvinnor',
    'Japansk Shiatsu Stockholm',
    'Hårbottenbehandling Kungsholmen',
    'Head spa Hornsberg',
    'Japansk skalpmassage',
    'Women only spa Stockholm',
    'Friskvård Kungsholmen',
    'Headspa Kungsholmen',
    'Premium headspa Sverige',
  ],

  authors: [{ name: 'Harmony Headspa Stockholm', url: SITE_URL }],
  creator: 'Harmony Headspa Stockholm',

  alternates: { canonical: '/' },

  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: SITE_URL,
    siteName: 'Harmony Headspa Stockholm',
    title: 'Harmony Headspa | Japansk Skalpmassage & Ritual i Stockholm',
    description:
      'Stockholms exklusivaste headspa för kvinnor. Japansk skalpmassage, Shiatsu och hårbottenbehandling i Hornsberg, Kungsholmen.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Harmony Headspa Stockholm — Japansk Skalpmassage & Ritual',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Harmony Headspa | Japansk Skalpmassage i Stockholm',
    description:
      'Exklusivt headspa för kvinnor i Kungsholmen, Stockholm. Boka din tid online.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Schema.org — HealthAndBeautyBusiness JSON-LD
// Lars Forssells gata 24, 112 15 Stockholm (Hornsberg, Kungsholmen)
// Geo: approximate centroid for Hornsberg waterfront, Stockholm
// ─────────────────────────────────────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'Harmony Headspa',
  description:
    'Exklusiv japansk headspa-ritual i Hornsberg, Stockholm. Djupgående skalpmassage, ångbehandling och total avslappning för kvinnor.',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: '$$$',
  currenciesAccepted: 'SEK',
  paymentAccepted: 'Cash, Credit Card, Swish, Epassi, Qliro',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lars Forssells gata 24',
    addressLocality: 'Stockholm',
    addressRegion: 'Stockholms län',
    postalCode: '120 64',
    addressCountry: 'SE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 59.3308,
    longitude: 18.0154,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '12:00',
      closes: '22:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/harmonyheadspa',
    'https://www.facebook.com/harmonyheadspa',
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Root Layout
// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
