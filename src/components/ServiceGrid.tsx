'use client'

import { motion } from 'framer-motion'
import { useReveal } from '@/lib/useReveal'
import { useBookingStore } from '@/store/useBookingStore'
import { SINGLES, DUOS, Service } from '@/lib/constants'

// ─── Constants ───────────────────────────────────────────────────────────────

const ZEN: [number, number, number, number] = [0.22, 1, 0.36, 1]
const INK   = '#1A1209'
const IVORY = '#FDFCF9'
const GOLD  = '#C9A96E'
const BODY  = '#6B5B45'

function formatPrice(price: number) {
  return price.toLocaleString('sv-SE') + ' kr'
}

function useOpenBooking() {
  const openBooking = useBookingStore((s) => s.openBooking)
  return (service: Service) =>
    openBooking({
      title:       service.title,
      price:       service.price,
      duration:    service.duration,
      description: service.description,
    })
}

// ─── Shared Boka Button ───────────────────────────────────────────────────────

function BookButton({ onClick, light = false }: { onClick: () => void; light?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ backgroundColor: GOLD, color: IVORY }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="px-7 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] cursor-pointer min-h-[48px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 rounded-sm"
      style={{
        background:    light ? IVORY : INK,
        color:         light ? INK   : IVORY,
        border:        `1px solid ${light ? 'rgba(26,18,9,0.15)' : 'transparent'}`,
      }}
    >
      Boka
    </motion.button>
  )
}

// ─── Featured Card (Signature / hero treatment) ───────────────────────────────

function FeaturedCard({ service }: { service: Service }) {
  const open = useOpenBooking()
  return (
    <motion.article
      className="md:col-span-2 rounded-xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 cursor-pointer"
      style={{ background: INK, color: IVORY }}
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(26,18,9,0.28)' }}
      initial={{ boxShadow: '0 4px 24px rgba(26,18,9,0.12)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex-1">
        {service.badge && (
          <p
            className="text-[13px] font-sans font-semibold uppercase tracking-[0.18em] mb-5 px-3 py-1.5 inline-block"
            style={{
              color:        INK,
              background:   GOLD,
              borderRadius: 2,
            }}
          >
            {service.badge}
          </p>
        )}
        <h3 className="font-serif text-2xl md:text-3xl mb-2" style={{ color: IVORY }}>
          {service.title}
        </h3>
        <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: 'rgba(253,252,249,0.75)' }}>
          {service.duration}
        </p>
        <p className="font-sans text-sm font-light leading-relaxed max-w-xl" style={{ color: 'rgba(253,252,249,0.78)' }}>
          {service.description}
        </p>
        {service.badges && (
          <div className="flex flex-wrap gap-2 mt-5">
            {service.badges.map((b) => (
              <span
                key={b}
                className="font-sans text-[13px] font-semibold uppercase tracking-[0.13em] px-2.5 py-1"
                style={{ color: 'rgba(253,252,249,0.75)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 2 }}
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className="w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end gap-6 pt-6 md:pt-0 md:pl-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <span className="font-serif text-3xl font-semibold" style={{ color: IVORY }}>
          {formatPrice(service.price)}
        </span>
        <BookButton onClick={() => open(service)} light />
      </div>
    </motion.article>
  )
}

// ─── Light Card (standard single treatment) ───────────────────────────────────

function LightCard({ service }: { service: Service }) {
  const open = useOpenBooking()
  return (
    <motion.article
      className="rounded-xl p-7 md:p-8 flex flex-col justify-between cursor-pointer"
      style={{
        background:  IVORY,
        border:      `1px solid rgba(201,169,110,0.18)`,
        boxShadow:   '0 2px 16px rgba(26,18,9,0.05)',
      }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(26,18,9,0.10)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div>
        {service.badge && (
          <p
            className="text-[13px] font-sans font-semibold uppercase tracking-[0.18em] mb-5 px-3 py-1.5 inline-block"
            style={{ color: INK, background: GOLD, borderRadius: 2 }}
          >
            {service.badge}
          </p>
        )}
        <h3 className="font-serif text-xl md:text-2xl leading-snug mb-2" style={{ color: INK }}>
          {service.title}
        </h3>
        <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: BODY }}>
          {service.duration}
        </p>
        {service.badges && (
          <div className="flex flex-wrap gap-2 mb-5">
            {service.badges.map((b) => (
              <span
                key={b}
                className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1"
                style={{ color: BODY, border: `1px solid rgba(26,18,9,0.10)`, borderRadius: 2 }}
              >
                {b}
              </span>
            ))}
          </div>
        )}
        <p className="font-sans text-sm font-light leading-relaxed" style={{ color: BODY }}>
          {service.description}
        </p>
      </div>

      <div
        className="mt-7 pt-5 flex justify-between items-center"
        style={{ borderTop: `1px solid rgba(26,18,9,0.06)` }}
      >
        <span className="font-serif text-2xl font-semibold" style={{ color: INK }}>
          {formatPrice(service.price)}
        </span>
        <BookButton onClick={() => open(service)} />
      </div>
    </motion.article>
  )
}

// ─── Duo Card ─────────────────────────────────────────────────────────────────

function DuoCard({ service }: { service: Service }) {
  const open  = useOpenBooking()
  const isWarm = service.variant === 'warm'

  return (
    <motion.article
      className="rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
      style={{
        background: isWarm ? 'rgba(201,169,110,0.07)' : IVORY,
        border:     `1px solid ${isWarm ? `rgba(201,169,110,0.30)` : 'rgba(201,169,110,0.15)'}`,
        boxShadow:  '0 2px 16px rgba(26,18,9,0.04)',
      }}
      whileHover={{ y: -4, boxShadow: '0 14px 36px rgba(26,18,9,0.09)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex-1">
        {service.badge && (
          <p
            className="text-[13px] font-sans font-semibold uppercase tracking-[0.18em] mb-3 px-3 py-1.5 inline-block"
            style={{ color: INK, background: GOLD, borderRadius: 2 }}
          >
            {service.badge}
          </p>
        )}
        <h3 className="font-serif text-lg md:text-xl font-semibold" style={{ color: INK }}>
          {service.title}
        </h3>
        <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em] mt-1.5" style={{ color: BODY }}>
          {service.duration}
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
        <span className="font-serif text-xl md:text-2xl font-semibold" style={{ color: INK }}>
          {formatPrice(service.price)}
        </span>
        <BookButton onClick={() => open(service)} />
      </div>
    </motion.article>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ title, tag }: { title: string; tag: string }) {
  return (
    <motion.div
      className="mb-12 md:mb-16"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease: ZEN }}
    >
      <p
        className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] mb-4"
        style={{ color: BODY }}
      >
        {tag}
      </p>
      <h2 className="font-serif text-2xl md:text-4xl tracking-[0.03em]" style={{ color: INK }}>
        {title}
      </h2>
      <div
        className="mt-5 rounded-full"
        style={{
          width: 40, height: '1px',
          background: `linear-gradient(90deg, ${GOLD}, transparent)`,
        }}
      />
    </motion.div>
  )
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function ServiceGrid() {
  const singlesRef = useReveal()
  const duoRef     = useReveal()

  return (
    <>
      {/* Singles */}
      <section ref={singlesRef} className="mb-24 reveal" id="behandlingar">
        <SectionHeader title="Välj din upplevelse" tag="Singles" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {SINGLES.map((service) =>
            service.variant === 'featured' ? (
              <FeaturedCard key={service.id} service={service} />
            ) : (
              <LightCard key={service.id} service={service} />
            )
          )}
        </div>
      </section>

      {/* Duos */}
      <section ref={duoRef} className="mb-24 reveal">
        <SectionHeader title="Njut tillsammans" tag="Duo" />
        <p
          className="font-sans text-sm font-light leading-relaxed -mt-8 mb-10"
          style={{ color: BODY, letterSpacing: '0.04em' }}
        >
          Inga skiljeväggar. Dela upplevelsen sida vid sida.
        </p>
        <div className="space-y-4">
          {DUOS.map((service) => (
            <DuoCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </>
  )
}
