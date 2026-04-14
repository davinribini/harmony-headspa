'use client'

import { motion } from 'framer-motion'

const ZEN: [number, number, number, number] = [0.22, 1, 0.36, 1]

const QUOTES = [
  {
    text:        'Den mest meditativa upplevelsen jag haft i Stockholm.',
    attribution: 'Sofia L.',
  },
  {
    text:        'Helt magiskt — som att sväva på moln.',
    attribution: 'Camilla S.',
  },
  {
    text:        'Min skalp har aldrig mått bättre. Ren lyx.',
    attribution: 'Frida J.',
  },
]

export default function Testimonials() {
  return (
    <section id="om-oss" className="py-32 md:py-40 w-full" style={{ background: '#FDFCF9' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Section label */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: ZEN }}
        >
          <p
            className="font-sans text-[13px] uppercase tracking-[0.26em] font-semibold"
            style={{ color: '#6B5B45' }}
          >
            Röster från våra gäster
          </p>
          <div
            className="mx-auto mt-5 rounded-full"
            style={{ width: 32, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
          />
        </motion.div>

        {/* Quotes — pure typography, no cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          {QUOTES.map(({ text, attribution }, i) => (
            <motion.blockquote
              key={attribution}
              className="text-center"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.6, ease: ZEN, delay: i * 0.18 }}
            >
              {/* Opening mark — decorative */}
              <p
                className="font-serif select-none mb-3"
                style={{ color: '#C9A96E', opacity: 0.35, fontSize: 56, lineHeight: 1 }}
                aria-hidden
              >
                {'\u201C'}
              </p>

              {/* Quote text */}
              <p
                className="font-serif italic text-xl md:text-2xl leading-relaxed mb-7"
                style={{ color: '#1A1209', letterSpacing: '0.01em' }}
              >
                {text}
              </p>

              {/* Gold divider — decorative */}
              <div
                className="mx-auto mb-5 rounded-full"
                style={{ width: 24, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
              />

              {/* Attribution */}
              <footer
                className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: '#6B5B45' }}
              >
                {attribution}
              </footer>
            </motion.blockquote>
          ))}
        </div>

      </div>
    </section>
  )
}
