'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INTRO_MS = 10000
const CURTAIN: [number, number, number, number] = [0.45, 0, 0.55, 1]
const ZEN: [number, number, number, number]     = [0.22, 1, 0.36, 1]

export default function BrandIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), INTRO_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="brand-intro"
          className="fixed inset-0 z-[9999] overflow-hidden bg-black"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: CURTAIN }}
        >

          {/* ── VIDEO — Ken Burns: starts zoomed, slowly exhales to 1.0 ─── */}
          <motion.video
            src="/ritual.mp4#t=3"
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ objectPosition: 'center 30%' }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1,  scale: 1.0  }}
            transition={{
              opacity: { duration: 1.8, ease: 'easeIn' },
              scale:   { duration: 10, ease: 'linear' },
            }}
          />

          {/* ── VIGNETTE — deep 85% black at edges, slight centre relief ── */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.72) 55%, rgba(0,0,0,0.88) 100%)' }}
          />

          {/* ── TEXT BAND — full-width blurred dark band, cinema title style  */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            <div
              className="w-full py-16 px-8 flex flex-col items-center gap-5 text-center"
              style={{ backdropFilter: 'blur(28px)', background: 'rgba(0,0,0,0.38)' }}
            >

              {/* Gold rule */}
              <motion.div
                style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 72, opacity: 1 }}
                transition={{ duration: 1.4, ease: ZEN, delay: 1.0 }}
              />

              {/* Wordmark — massive, bold, fully opaque */}
              <motion.h1
                className="font-serif font-bold uppercase text-4xl md:text-6xl lg:text-7xl"
                style={{
                  color:      '#FDFCF9',
                  textShadow: '0 4px 24px rgba(0,0,0,0.8)',
                }}
                initial={{ opacity: 0, filter: 'blur(16px)', letterSpacing: '0.02em' }}
                animate={{ opacity: 1, filter: 'blur(0px)',  letterSpacing: '0.16em' }}
                transition={{ duration: 3, ease: ZEN, delay: 0.5 }}
              >
                Harmony Headspa
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="font-sans uppercase text-xs md:text-sm"
                style={{
                  color:          '#C9A96E',
                  letterSpacing:  '0.32em',
                  textShadow:     '0 2px 12px rgba(0,0,0,0.7)',
                }}
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 3, ease: ZEN, delay: 1.2 }}
              >
                Stockholm
              </motion.p>

              {/* Gold rule */}
              <motion.div
                style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 72, opacity: 1 }}
                transition={{ duration: 1.4, ease: ZEN, delay: 1.6 }}
              />

              {/* Welcome message */}
              <motion.p
                className="font-sans italic font-light text-base md:text-xl"
                style={{
                  color:         '#FDFCF9',
                  letterSpacing: '0.06em',
                  textShadow:    '0 2px 16px rgba(0,0,0,0.9)',
                  maxWidth:      560,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 4.5, ease: 'easeOut' }}
              >
                Varmt välkommen till din stund av harmoni.
              </motion.p>

            </div>
          </div>

          {/* ── PROGRESS BAR ─────────────────────────────────────────────── */}
          <div
            className="absolute bottom-0 left-0 right-0 z-30"
            style={{ height: '1px', background: 'rgba(201,169,110,0.18)' }}
          >
            <motion.div
              style={{ height: '1px', background: '#C9A96E', width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 10, ease: 'linear' }}
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
