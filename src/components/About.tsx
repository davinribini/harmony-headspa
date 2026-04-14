'use client'

import { motion } from 'framer-motion'

const ZEN: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function About() {
  return (
    <motion.section
      className="py-24 md:py-32 px-2 max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, ease: ZEN }}
    >
      <p
        className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] mb-5"
        style={{ color: '#6B5B45' }}
      >
        Om oss
      </p>

      <h2
        className="font-serif text-3xl md:text-5xl leading-snug mb-8"
        style={{ color: '#1A1209' }}
      >
        Japansk Headspa i Hjärtat av Stockholm
      </h2>

      <div
        className="mx-auto mb-8 rounded-full"
        style={{ width: 40, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
      />

      <p
        className="font-sans text-base md:text-lg font-light leading-relaxed"
        style={{ color: '#6B5B45' }}
      >
        Harmony Headspa är en exklusiv salong enbart för kvinnor, belägen i Hornsberg, Stockholm.
        Vi erbjuder autentiska japanska headspa-behandlingar som kombinerar djuprengöring av
        hårbotten, avslappnande massage och totalt välmående. Varje behandling är skräddarsydd för
        din hårbottens unika behov.
      </p>
    </motion.section>
  )
}
