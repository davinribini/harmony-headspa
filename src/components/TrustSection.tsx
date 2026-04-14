'use client'

import { motion } from 'framer-motion'
import { REVIEWS } from '@/lib/constants'

const ZEN: [number, number, number, number] = [0.22, 1, 0.36, 1]
const INK   = '#1A1209'
const IVORY = '#FDFCF9'
const GOLD  = '#C9A96E'
const BODY  = '#6B5B45'

function SectionLabel({ tag, title }: { tag: string; title: string }) {
  return (
    <motion.div
      className="mb-12 md:mb-16"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease: ZEN }}
    >
      <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: BODY }}>{tag}</p>
      <h2 className="font-serif text-2xl md:text-4xl" style={{ color: INK }}>{title}</h2>
      <div className="mt-4 rounded-full" style={{ width: 32, height: '1px', background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
    </motion.div>
  )
}

function StarRow({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-1" style={{ color: GOLD }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1l2.39 5.26L18 7.27l-4 3.9.94 5.49L10 14l-4.94 2.66.94-5.49-4-3.9 5.61-.01L10 1z" />
        </svg>
      ))}
    </div>
  )
}

const TRUST_ITEMS = [
  {
    title: 'Shiatsu-teknik',
    body:  'Djupgående tryckmassage för balanserad sinnesstämning. Varje punkt stimuleras med precision för maximal avslappning.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
      </svg>
    ),
    extra: null,
  },
  {
    title: 'Premium varumärken',
    body:  null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9z" />
      </svg>
    ),
    extra: ['Paul Mitchell', 'La Roche-Posay', 'Weleda'],
  },
  {
    title: 'Endast för kvinnor',
    body:  null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="5" />
        <path d="M12 14v8" />
        <path d="M9 19h6" />
      </svg>
    ),
    extra:    null,
    centered: true,
  },
  {
    title: 'Certifierade specialister',
    body:  null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    extra:    null,
    centered: true,
  },
]

export default function TrustSection() {
  return (
    <>
      {/* ── Why us ──────────────────────────────────────────────────────── */}
      <section className="mb-24">
        <SectionLabel tag="Varför oss" title="Vad som gör oss unika" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRUST_ITEMS.map(({ title, body, icon, extra, centered }) => (
            <motion.div
              key={title}
              className={`rounded-xl p-7 ${centered ? 'text-center' : 'flex flex-col md:flex-row gap-5'}`}
              style={{ background: IVORY, border: `1px solid rgba(201,169,110,0.18)`, boxShadow: '0 2px 16px rgba(26,18,9,0.04)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.0, ease: ZEN }}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${centered ? 'mx-auto mb-4' : ''}`}
                style={{ background: 'rgba(201,169,110,0.10)', border: `1px solid rgba(201,169,110,0.20)`, color: GOLD }}
              >
                {icon}
              </div>
              <div>
                <h3 className="font-serif text-lg mb-2" style={{ color: INK }}>{title}</h3>
                {body && <p className="font-sans text-sm font-light leading-relaxed" style={{ color: BODY }}>{body}</p>}
                {extra && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {extra.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1"
                        style={{ color: BODY, border: `1px solid rgba(26,18,9,0.10)`, borderRadius: 2 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Inför besöket ───────────────────────────────────────────────── */}
      <section className="mb-24 max-w-3xl mx-auto">
        <motion.details
          className="rounded-xl overflow-hidden group"
          style={{ background: IVORY, border: `1px solid rgba(201,169,110,0.20)`, boxShadow: '0 2px 16px rgba(26,18,9,0.04)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.0, ease: ZEN }}
        >
          <summary className="p-7 md:p-8 flex justify-between items-center cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden min-h-[72px]">
            <div>
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-2" style={{ color: BODY }}>Praktisk info</p>
              <h2 className="font-serif text-xl md:text-2xl" style={{ color: INK }}>Inför ditt besök</h2>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-180"
              style={{ border: `1px solid rgba(201,169,110,0.25)`, color: GOLD }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </summary>
          <div className="px-7 md:px-8 pb-8">
            <div className="h-px mb-7" style={{ background: 'rgba(201,169,110,0.15)' }} />
            <ul className="space-y-6">
              {[
                { ok: true,  title: 'Osminkad',             body: 'Kom utan makeup för bästa resultat av ansikts- och skalpbehandlingen.' },
                { ok: true,  title: 'Inga smycken',         body: 'Ta av halsband och örhängen innan behandlingen börjar.' },
                { ok: true,  title: 'Inga extensions',      body: 'Din hårbotten behöver vara helt fri från extensions för optimal massage och rengöring.' },
                { ok: false, title: '24h avbokningspolicy', body: 'Avbokning måste ske senast 24 timmar innan din bokade tid.' },
              ].map(({ ok, title, body }) => (
                <li key={title} className="flex items-start gap-4">
                  <div
                    className="mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: ok ? 'rgba(201,169,110,0.12)' : 'rgba(26,18,9,0.07)',
                      color:      ok ? GOLD : INK,
                      border:     `1px solid ${ok ? 'rgba(201,169,110,0.25)' : 'rgba(26,18,9,0.12)'}`,
                    }}
                  >
                    {ok ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    )}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold mb-1" style={{ color: INK }}>{title}</p>
                    <p className="font-sans text-sm font-light leading-relaxed" style={{ color: BODY }}>{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.details>
      </section>

      {/* ── Reviews ─────────────────────────────────────────────────────── */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: BODY }}>Gästrecensioner</p>
          <h2 className="font-serif text-2xl md:text-4xl mb-7" style={{ color: INK }}>Verifierade Recensioner</h2>
          <div
            className="inline-flex items-center justify-center gap-3 rounded-full px-7 py-3"
            style={{ background: IVORY, border: `1px solid rgba(201,169,110,0.25)`, boxShadow: '0 2px 16px rgba(26,18,9,0.05)' }}
          >
            <StarRow size={16} />
            <span className="font-sans text-xs md:text-sm font-semibold" style={{ color: INK }}>4.6 / 5 · 128+ omdömen</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {REVIEWS.map(({ author, text }) => (
            <motion.article
              key={author}
              className="rounded-xl p-7 md:p-8 flex flex-col"
              style={{ background: IVORY, border: `1px solid rgba(201,169,110,0.16)`, boxShadow: '0 2px 16px rgba(26,18,9,0.04)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.0, ease: ZEN }}
            >
              <div className="flex justify-between items-start mb-5">
                <StarRow size={14} />
                <span
                  className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 flex items-center gap-1.5"
                  style={{ color: INK, border: `1px solid rgba(26,18,9,0.15)`, borderRadius: 2 }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Verifierad
                </span>
              </div>
              <p className="font-sans text-sm font-light leading-relaxed italic mb-6 flex-1" style={{ color: BODY }}>&ldquo;{text}&rdquo;</p>
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: BODY }}>— {author}</p>
            </motion.article>
          ))}
        </div>
      </section>

    </>
  )
}
