'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const ZEN: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <>
      {/* Availability signal
          flex-wrap: if the text is too long for the viewport it wraps
          rather than overflowing. min-w-0 on the span allows it to shrink. */}
      <motion.div
        className="w-full flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 pt-32 md:pt-40 pb-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: ZEN }}
      >
        <span className="w-2 h-2 rounded-full shrink-0 animate-liveRing" style={{ background: '#C9A96E' }} />
        <span
          className="font-sans text-[13px] font-semibold tracking-[0.08em] md:tracking-[0.14em] uppercase text-center break-words min-w-0"
          style={{ color: '#1A1209' }}
        >
          Lediga tider tillgängliga denna vecka
        </span>
      </motion.div>

      <motion.header
        id="hero-section"
        className="w-full flex flex-col items-center text-center pt-10 md:pt-16 pb-16"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.4, ease: ZEN }}
      >
        {/* Logo */}
        <div
          className="mb-8 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden animate-goldPulse"
          style={{
            border:     '1px solid rgba(201,169,110,0.35)',
            boxShadow:  '0 0 0 6px rgba(201,169,110,0.08), 0 8px 32px rgba(26,18,9,0.10)',
            background: '#FDFCF9',
          }}
        >
          <Image
            src="/logo.jpg.jpg"
            alt="Harmony Headspa"
            width={160}
            height={160}
            className="w-full h-full object-cover rounded-full"
            priority
          />
        </div>

        {/* Instagram handle */}
        <p
          className="font-sans text-[13px] tracking-[0.20em] uppercase mb-7 font-semibold"
          style={{ color: '#6B5B45' }}
        >
          @harmony.headspa
        </p>

        {/* Rating badge — flex justify-center guarantees centering of inline-flex pill */}
        <div className="flex justify-center w-full mb-10">
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5"
            style={{
              background: '#FDFCF9',
              border:     '1px solid rgba(201,169,110,0.28)',
              boxShadow:  '0 2px 16px rgba(26,18,9,0.06)',
            }}
          >
            <StarIcon className="w-3.5 h-3.5 shrink-0" filled />
            <span
              className="font-sans text-sm font-semibold"
              style={{ color: '#1A1209' }}
            >
              4.6 / 5 · 128+ verifierade recensioner
            </span>
          </div>
        </div>

        {/* H1 */}
        <h1
          className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] px-2 mb-6 w-full break-words"
          style={{ color: '#1A1209', maxWidth: 820 }}
        >
          Ge din skalp nytt liv i{' '}
          <br className="hidden md:block" />
          Stockholms exklusiva oas{' '}
          <em className="font-normal italic" style={{ color: '#C9A96E' }}>för kvinnor.</em>
        </h1>

        {/* Sub-tagline */}
        <p
          className="font-sans text-sm md:text-base font-semibold tracking-[0.06em]"
          style={{ color: '#1A1209' }}
        >
          Fullt friskvårdsgodkända
        </p>

        {/* Decorative rule */}
        <div className="mt-12 flex items-center justify-center gap-5">
          <div className="rounded-full" style={{ width: 64, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="2" fill="#C9A96E" />
          </svg>
          <div className="rounded-full" style={{ width: 64, height: '1px', background: 'linear-gradient(270deg, transparent, #C9A96E)' }} />
        </div>
      </motion.header>
    </>
  )
}

function StarIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill={filled ? '#C9A96E' : 'none'}>
      <path d="M10 1l2.39 5.26L18 7.27l-4 3.9.94 5.49L10 14l-4.94 2.66.94-5.49-4-3.9 5.61-.01L10 1z" />
    </svg>
  )
}
