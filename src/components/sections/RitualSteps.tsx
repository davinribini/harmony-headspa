'use client'

import { motion } from 'framer-motion'

const ZEN: [number, number, number, number] = [0.22, 1, 0.36, 1]

const STEPS = [
  {
    number: '01',
    heading: 'Analys & Konsultation',
    body: 'Varje ritual börjar med en mikroskopisk skalpanalys för att skräddarsy behandlingen efter dina specifika behov.',
  },
  {
    number: '02',
    heading: 'Djuprengöring & Ånga',
    body: 'En harmonisk kombination av ångbad och massage som öppnar upp porerna och rengör på djupet.',
  },
  {
    number: '03',
    heading: 'Japansk Skalpmassage',
    body: 'Vår signaturmassage som löser upp spänningar, ökar cirkulationen och försätter sinnet i total avslappning.',
  },
  {
    number: '04',
    heading: 'Yume Vattenridå',
    body: 'Upplev den meditativa vattenridån som sköljer över skalpen och sluter ritualen i fullständig harmoni.',
  },
]

export default function RitualSteps() {
  return (
    <section
      id="ritualen"
      className="relative py-40 md:py-48 w-full"
      style={{ background: '#1A1209' }}
      aria-label="Ritualens steg"
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-24 md:mb-32 px-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: ZEN }}
      >
        <div
          className="mx-auto mb-8 rounded-full"
          style={{ width: 40, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
        />
        <h2
          className="font-serif text-4xl md:text-6xl tracking-[0.06em] uppercase"
          style={{ color: '#FDFCF9' }}
        >
          Ritualen
        </h2>
        <p
          className="mt-5 font-sans text-[13px] font-semibold tracking-[0.22em] uppercase"
          style={{ color: 'rgba(253,252,249,0.78)' }}
        >
          Fyra akter. En fullständig harmoni.
        </p>
      </motion.div>

      {/* Steps */}
      <ol className="relative mx-auto max-w-4xl px-8 md:px-16 space-y-0">

        {/* Vertical spine */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0"
          style={{ width: '1px', transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.3) 15%, rgba(201,169,110,0.3) 85%, transparent)' }}
          aria-hidden
        />

        {STEPS.map((step, i) => {
          const isEven = i % 2 === 0

          return (
            <motion.li
              key={step.number}
              className="relative grid md:grid-cols-2 gap-0 md:gap-20 items-center py-20 md:py-24"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, ease: ZEN, delay: 0.08 }}
            >
              {/* Spine node */}
              <div
                className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 6, height: 6, background: '#C9A96E', boxShadow: '0 0 10px rgba(201,169,110,0.5)' }}
                aria-hidden
              />

              {/* Large number — decorative gold, commanding presence */}
              <div className={`flex flex-col ${isEven ? 'md:items-end md:order-1' : 'md:items-start md:order-2'}`}>
                <span
                  className="font-serif select-none"
                  style={{
                    fontSize:      'clamp(80px, 12vw, 140px)',
                    lineHeight:    1,
                    color:         '#C9A96E',
                    letterSpacing: '-0.02em',
                    opacity:       1,
                  }}
                  aria-hidden
                >
                  {step.number}
                </span>
              </div>

              {/* Text block */}
              <div className={`mt-4 md:mt-0 ${isEven ? 'md:order-2' : 'md:order-1 md:text-right'}`}>
                <p
                  className="font-sans text-[13px] font-semibold tracking-[0.26em] uppercase mb-4"
                  style={{ color: 'rgba(253,252,249,0.65)' }}
                >
                  {step.number}
                </p>
                <h3
                  className="font-serif text-2xl md:text-3xl tracking-[0.02em] mb-5"
                  style={{ color: '#FDFCF9' }}
                >
                  {step.heading}
                </h3>

                <div
                  className={`mb-5 rounded-full ${isEven ? '' : 'md:ml-auto'}`}
                  style={{ width: 32, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
                />

                <p
                  className="font-sans text-base md:text-lg font-light leading-relaxed"
                  style={{ color: 'rgba(253,252,249,0.80)', letterSpacing: '0.02em' }}
                >
                  {step.body}
                </p>
              </div>
            </motion.li>
          )
        })}
      </ol>

      {/* Closing rule */}
      <motion.div
        className="text-center mt-24 md:mt-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: ZEN }}
      >
        <div
          className="mx-auto rounded-full"
          style={{ width: 40, height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
