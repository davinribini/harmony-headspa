'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useBookingStore } from '@/store/useBookingStore'

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false)
  const openBooking = useBookingStore((s) => s.openBooking)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background:           scrolled ? 'rgba(253,252,249,0.92)' : 'transparent',
        backdropFilter:       scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom:         scrolled ? '1px solid rgba(201,169,110,0.15)' : '1px solid transparent',
        boxShadow:            scrolled ? '0 2px 24px rgba(26,18,9,0.06)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-6">

        {/* ── Wordmark ─────────────────────────────────────────────────── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 shrink-0 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 rounded"
        >
          <div
            className="w-7 h-7 rounded-full overflow-hidden shrink-0"
            style={{ border: '1px solid rgba(201,169,110,0.30)' }}
          >
            <Image
              src="/logo.jpg.jpg"
              alt="Harmony Headspa"
              width={28}
              height={28}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span
            className="font-serif text-sm md:text-base tracking-[0.06em] font-semibold"
            style={{ color: scrolled ? '#1A1209' : '#FDFCF9', transition: 'color 0.4s' }}
          >
            Harmony Headspa
          </span>
        </button>

        {/* ── Nav links (desktop only) ──────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Huvudnavigation">
          {[
            { label: 'Ritualen',     id: 'ritualen'    },
            { label: 'Behandlingar', id: 'behandlingar'},
            { label: 'Kontakt',      id: 'kontakt'     },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 min-h-[48px] px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 rounded"
              style={{ color: scrolled ? '#1A1209' : 'rgba(253,252,249,0.85)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? '#1A1209' : 'rgba(253,252,249,0.85)')}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* ── Boka CTA ─────────────────────────────────────────────────── */}
        <motion.button
          onClick={() => scrollTo('behandlingar')}
          whileHover={{
            backgroundColor: '#C9A96E',
            color: '#FDFCF9',
            boxShadow: '0 0 18px rgba(201,169,110,0.35)',
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="font-sans text-[13px] uppercase tracking-[0.20em] font-semibold px-6 shrink-0 cursor-pointer min-h-[48px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2"
          style={{
            background:   '#1A1209',
            color:        '#FDFCF9',
            borderRadius: 2,
          }}
        >
          Boka
        </motion.button>

      </div>
    </header>
  )
}
