'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
  const [hidden, setHidden] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setHidden(true)
      setTimeout(() => setGone(true), 850)
    }, 1500)
    return () => clearTimeout(t)
  }, [])

  if (gone) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#EDE7DA] flex items-center justify-center transition-[opacity,visibility] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}
    >
      <div
        className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden animate-goldPulse"
        style={{ border: '1.5px solid rgba(255,255,255,0.8)', boxShadow: '0 0 0 2px rgba(201,169,110,0.15), 0 0 18px rgba(201,169,110,0.1)' }}
      >
        <Image
          src="/logo.jpg.jpg"
          alt="Harmony Headspa Logo"
          width={160}
          height={160}
          className="w-full h-full object-cover rounded-full"
          priority
        />
      </div>
    </div>
  )
}
