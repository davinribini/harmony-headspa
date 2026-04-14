'use client'

import { motion } from 'framer-motion'
import { useBookingStore } from '@/store/useBookingStore'
import { EPASSI_SERVICE } from '@/lib/constants'

const ZEN: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function EpassiBanner() {
  const openBooking = useBookingStore((s) => s.openBooking)

  const handleClick = () => {
    openBooking({
      title:       EPASSI_SERVICE.title,
      price:       EPASSI_SERVICE.price,
      duration:    EPASSI_SERVICE.duration,
      description: EPASSI_SERVICE.description,
    })
  }

  return (
    <motion.section
      className="mb-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease: ZEN }}
    >
      <div
        className="rounded-xl px-8 md:px-14 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        style={{
          background:  '#FDFCF9',
          border:      '1px solid rgba(201,169,110,0.28)',
          boxShadow:   '0 2px 24px rgba(26,18,9,0.05)',
        }}
      >
        {/* Left — copy */}
        <div className="flex-1 max-w-xl">
          <p
            className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: '#6B5B45' }}
          >
            Partnerprivilegium
          </p>
          <h2
            className="font-serif text-2xl md:text-3xl mb-4"
            style={{ color: '#1A1209' }}
          >
            Hämta ut din friskvård med Epassi
          </h2>
          <p
            className="font-sans text-base font-light leading-relaxed"
            style={{ color: '#6B5B45' }}
          >
            Välj Epassi direkt som betalningsmetod i vår kassa. Snabbt, tryggt och helt integrerat — din friskvårdsförmån används sömlöst.
          </p>
        </div>

        {/* Right — logo + CTA */}
        <div className="flex flex-col items-start md:items-end gap-6 shrink-0">
          {/* Epassi wordmark in brand ink */}
          <svg viewBox="0 0 100 30" height="24" fill="#1A1209" xmlns="http://www.w3.org/2000/svg" aria-label="Epassi">
            <text x="0"  y="22" fontFamily="sans-serif" fontWeight="900" fontSize="24" letterSpacing="-1">e</text>
            <text x="14" y="22" fontFamily="sans-serif" fontWeight="600" fontSize="24" letterSpacing="-0.5">passi</text>
          </svg>

          <motion.button
            onClick={handleClick}
            whileHover={{ backgroundColor: '#C9A96E', color: '#FDFCF9' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="font-sans text-[13px] uppercase tracking-[0.20em] font-semibold px-8 min-h-[48px] cursor-pointer flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2"
            style={{
              background:   '#1A1209',
              color:        '#FDFCF9',
              border:       '1px solid transparent',
              borderRadius: 2,
            }}
          >
            Boka med Epassi
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}
