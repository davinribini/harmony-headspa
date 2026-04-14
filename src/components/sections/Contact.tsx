'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const ZEN: [number, number, number, number] = [0.22, 1, 0.36, 1]
const INK  = '#1A1209'
const GOLD = '#C9A96E'
const BODY = '#6B5B45'

const LINKS = [
  {
    href:  'https://maps.google.com/?q=Lars+Forssells+gata+24,+Stockholm',
    label: 'Lars Forssells gata 24',
    sub:   'Hornsberg, Stockholm',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    href:  'https://www.instagram.com/harmony.headspa',
    label: '@harmony.headspa',
    sub:   'Följ oss på Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href:  'mailto:harmonyspa.stockholm@gmail.com',
    label: 'Mejla oss',
    sub:   'harmonyspa.stockholm@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

// ─── Row 1: Editorial Split ───────────────────────────────────────────────────

function EditorialSplit() {
  return (
    <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

      {/* LEFT — Invitation heading + location copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: ZEN }}
      >
        <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.24em] mb-6" style={{ color: BODY }}>
          Besök oss
        </p>
        <h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.06] mb-8"
          style={{ color: INK }}
        >
          Besök vår oas
        </h2>
        <div
          className="mb-8 rounded-full"
          style={{ width: 40, height: '1px', background: `linear-gradient(90deg, ${GOLD}, transparent)` }}
        />
        <p
          className="font-sans text-base md:text-lg font-light leading-relaxed"
          style={{ color: BODY }}
        >
          Vi befinner oss i Hornsberg — ett av Stockholms mest levande och
          lugna stadsdelar. En kort promenad från vattnet, mitt i en atmosfär
          som speglar vårt löfte: ro, precision och fullständig harmoni.
        </p>
      </motion.div>

      {/* RIGHT — Google Business Card panel */}
      <motion.div
        className="md:pt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: ZEN, delay: 0.15 }}
      >
        <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.24em] mb-6" style={{ color: BODY }}>
          Kontaktuppgifter
        </p>

        <div
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid rgba(201,169,110,0.22)`, boxShadow: '0 4px 32px rgba(26,18,9,0.06)' }}
        >
          {LINKS.map(({ href, label, sub, icon }, i, arr) => (
            <div key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 px-7 min-h-[72px] py-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C9A96E]"
                style={{ background: '#FDFCF9' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,169,110,0.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#FDFCF9')}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: `1px solid rgba(201,169,110,0.28)`, color: GOLD, background: 'rgba(201,169,110,0.06)' }}
                >
                  {icon}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-serif text-lg font-semibold mb-0.5 truncate" style={{ color: INK }}>
                    {label}
                  </p>
                  <p className="font-sans text-sm tracking-[0.03em] truncate" style={{ color: BODY }}>
                    {sub}
                  </p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.55 }}>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
              {i < arr.length - 1 && (
                <div style={{ height: '1px', background: 'rgba(201,169,110,0.12)', margin: '0 28px' }} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

// ─── Row 2: Salon Gallery ─────────────────────────────────────────────────────

function SalonGallery() {
  return (
    <div className="mt-24 md:mt-32">
      <motion.p
        className="font-sans text-[13px] font-semibold uppercase tracking-[0.24em] mb-8"
        style={{ color: BODY }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.0, ease: ZEN }}
      >
        Salongen
      </motion.p>

      {/* Staggered image grid — large left panel, offset smaller right panel */}
      <div className="grid grid-cols-3 gap-4 md:gap-5 items-start">

        {/* Large panel — exterior/corner context */}
        <motion.div
          className="col-span-2 relative overflow-hidden rounded-xl"
          style={{
            border:     '1px solid rgba(201,169,110,0.22)',
            boxShadow:  '0 8px 40px rgba(26,18,9,0.12)',
            aspectRatio: '4/3',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: ZEN, delay: 0.05 }}
        >
          <Image
            src="/image_70.jpg"
            alt="Harmony Headspa — exteriör, Hornsberg"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </motion.div>

        {/* Smaller panel — entrance door, offset down for stagger */}
        <motion.div
          className="col-span-1 relative overflow-hidden rounded-xl"
          style={{
            border:     '1px solid rgba(201,169,110,0.22)',
            boxShadow:  '0 8px 40px rgba(26,18,9,0.10)',
            aspectRatio: '3/4',
            marginTop:  '6%',
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: ZEN, delay: 0.22 }}
        >
          <Image
            src="/image_71.png"
            alt="Harmony Headspa — ingångsdörr"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

      </div>
    </div>
  )
}

// ─── Row 3: Map + Hours ───────────────────────────────────────────────────────

function MapAndHours() {
  return (
    <div className="mt-16 md:mt-20 grid md:grid-cols-3 gap-8 md:gap-10 items-stretch">

      {/* Map — 2/3 width */}
      <motion.div
        className="md:col-span-2 overflow-hidden rounded-xl"
        style={{ border: `1px solid rgba(201,169,110,0.20)`, minHeight: 300 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: ZEN }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.0!2d18.02!3d59.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f77f9d43e74e7%3A0x1!2sLars+Forssells+gata+24%2C+Stockholm!5e0!3m2!1ssv!2sse!4v1"
          width="100%"
          height="100%"
          style={{
            border:   0,
            display:  'block',
            minHeight: 300,
            filter:   'grayscale(100%) sepia(18%) contrast(0.90) brightness(1.06)',
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Harmony Headspa karta"
        />
      </motion.div>

      {/* Hours — 1/3 width */}
      <motion.div
        className="md:col-span-1 rounded-xl p-7 md:p-8 flex flex-col justify-center"
        style={{
          background: '#FDFCF9',
          border:     `1px solid rgba(201,169,110,0.22)`,
          boxShadow:  '0 4px 24px rgba(26,18,9,0.05)',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: ZEN, delay: 0.15 }}
      >
        <p
          className="font-sans text-[13px] font-semibold uppercase tracking-[0.24em] mb-6"
          style={{ color: BODY }}
        >
          Öppettider
        </p>

        <h3
          className="font-serif text-xl md:text-2xl mb-6"
          style={{ color: INK }}
        >
          Öppet varje dag
        </h3>

        <div
          className="flex justify-between items-center py-4"
          style={{ borderTop: `1px solid rgba(201,169,110,0.15)`, borderBottom: `1px solid rgba(201,169,110,0.15)` }}
        >
          <span
            className="font-sans text-sm font-semibold uppercase tracking-[0.08em]"
            style={{ color: INK }}
          >
            Mån – Sön
          </span>
          <span
            className="font-serif text-xl font-semibold"
            style={{ color: INK }}
          >
            12:00 – 22:00
          </span>
        </div>

        <p
          className="font-sans text-sm font-light leading-relaxed mt-5"
          style={{ color: BODY, letterSpacing: '0.03em' }}
        >
          Drop-ins välkomnas vid lediga tider. Bokning rekommenderas för garanterad plats.
        </p>

        <a
          href="https://maps.google.com/?q=Lars+Forssells+gata+24,+Stockholm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-7 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 rounded"
          style={{ color: BODY }}
          onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
          onMouseLeave={(e) => (e.currentTarget.style.color = BODY)}
        >
          Vägbeskrivning
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </motion.div>

    </div>
  )
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section
      id="kontakt"
      className="py-32 md:py-40"
      style={{ background: '#FDFCF9' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <EditorialSplit />
        <SalonGallery />
        <MapAndHours />
      </div>
    </section>
  )
}
