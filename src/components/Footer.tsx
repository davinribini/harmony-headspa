'use client'

import { motion } from 'framer-motion'

const ZEN: [number, number, number, number] = [0.22, 1, 0.36, 1]

const NAV = [
  { label: 'Ritualen',     href: '#ritualen'     },
  { label: 'Behandlingar', href: '#behandlingar' },
  { label: 'Kontakt',      href: '#kontakt'      },
]

export default function Footer() {
  return (
    <footer style={{ background: '#1A1209' }}>
      <motion.div
        className="max-w-6xl mx-auto px-8 md:px-12 pt-24 md:pt-32 pb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.2, ease: ZEN }}
      >

        {/* ── Centered wordmark ────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p
            className="font-sans text-[13px] uppercase tracking-[0.28em] mb-5 font-semibold"
            style={{ color: '#C9A96E' }}
          >
            Stockholm
          </p>
          <h2
            className="font-serif text-3xl md:text-5xl uppercase tracking-[0.10em]"
            style={{ color: '#FDFCF9' }}
          >
            Harmony Headspa
          </h2>
          <p
            className="font-sans text-sm font-light mt-3 tracking-[0.08em]"
            style={{ color: 'rgba(253,252,249,0.65)' }}
          >
            En exklusiv oas för kvinnor
          </p>
        </div>

        {/* ── Navigation links ─────────────────────────────────────────── */}
        <nav className="flex items-center justify-center gap-8 md:gap-12 mb-12" aria-label="Sidfot">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] transition-colors min-h-[48px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1209] rounded px-1"
              style={{ color: 'rgba(253,252,249,0.78)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,252,249,0.78)')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── Instagram icon ───────────────────────────────────────────── */}
        <div className="flex justify-center mb-14">
          <a
            href="https://www.instagram.com/harmony.headspa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram — @harmony.headspa"
            className="min-h-[48px] min-w-[48px] flex items-center justify-center transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1209] rounded-full"
            style={{ color: '#C9A96E', opacity: 0.80 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.80')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* ── Gold divider ─────────────────────────────────────────────── */}
        <div
          className="mx-auto mb-8 rounded-full"
          style={{
            width:      200,
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
          }}
        />

        {/* ── Copyright row ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p
            className="font-sans text-[13px] uppercase tracking-[0.18em]"
            style={{ color: 'rgba(253,252,249,0.60)' }}
          >
            © 2026 Harmony Headspa Stockholm
          </p>
          <p
            className="font-sans text-[13px] uppercase tracking-[0.15em]"
            style={{ color: 'rgba(253,252,249,0.50)' }}
          >
            Fullt friskvårdsgodkända
          </p>
        </div>

      </motion.div>
    </footer>
  )
}
