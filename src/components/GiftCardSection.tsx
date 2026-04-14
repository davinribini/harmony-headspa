'use client'

import { useState } from 'react'
import { useReveal } from '@/lib/useReveal'
import { useBookingStore } from '@/store/useBookingStore'
import { SURPRISE_PACKAGE, GIFT_CARD_AMOUNTS } from '@/lib/constants'

function formatPrice(price: number) {
  return price.toLocaleString('sv-SE') + ' kr'
}

export default function GiftCardSection() {
  const surpriseRef = useReveal<HTMLElement>()
  const giftRef = useReveal<HTMLElement>()
  const openBooking = useBookingStore((s) => s.openBooking)
  const [customAmount, setCustomAmount] = useState('')

  const openSurprise = () => {
    openBooking({
      title: SURPRISE_PACKAGE.title,
      price: SURPRISE_PACKAGE.price,
      duration: SURPRISE_PACKAGE.duration,
      description: SURPRISE_PACKAGE.description,
    })
  }

  const openGiftCard = (amount: number) => {
    openBooking({
      title: 'Presentkort',
      price: amount,
      duration: '-',
      description: `Ett digitalt presentkort laddat med ${amount.toLocaleString('sv-SE')} kr.`,
    })
  }

  const handleCustomGift = () => {
    const val = parseInt(customAmount)
    if (!customAmount || isNaN(val) || val < 100) {
      alert('Vänligen ange ett giltigt belopp (minst 100 kr).')
      return
    }
    openGiftCard(val)
    setCustomAmount('')
  }

  return (
    <>
      {/* Överraskningspaketet */}
      <section ref={surpriseRef} className="mb-16 reveal">
        <div className="flex justify-between items-end mb-6 px-2 border-b border-brand-gold/20 pb-2">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold">Ge bort något oförglömligt</h2>
          <span className="text-xs font-bold tracking-widest text-brand-gold uppercase">Paket</span>
        </div>

        <article
          className="rounded-[32px] p-8 md:p-10 relative overflow-hidden border border-white/10 cursor-pointer transition-transform active:scale-[0.99]"
          style={{ background: 'rgba(36,33,29,0.88)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', color: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
        >
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-gold/20 blur-[60px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-block border border-white/20 bg-white/10 px-3 py-1.5 rounded-full text-[13px] font-bold tracking-widest text-white uppercase mb-4">
                {SURPRISE_PACKAGE.badge}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">{SURPRISE_PACKAGE.title}</h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 max-w-lg">
                {SURPRISE_PACKAGE.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Bukett', icon: <HeartIcon /> },
                  { label: 'Choklad', icon: <BoxIcon /> },
                  { label: 'Doftljus', icon: <SunIcon /> },
                ].map(({ label, icon }) => (
                  <span key={label} className="flex items-center gap-2 bg-white/10 border border-white/10 px-3.5 py-2 rounded-lg text-xs font-medium text-white">
                    {icon} {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full md:w-auto bg-black/40 p-6 rounded-3xl border border-white/10 text-center shrink-0">
              <p className="font-serif text-3xl md:text-4xl text-brand-gold mb-6">{formatPrice(SURPRISE_PACKAGE.price)}</p>
              <button
                onClick={openSurprise}
                className="bg-gradient-to-br from-[#d4b06a] to-[#b8924d] text-white w-full px-8 min-h-[48px] rounded-xl text-[13px] font-bold uppercase tracking-widest shadow-lg shadow-brand-gold/20 transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2"
              >
                Boka Paketet
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* Gift Card */}
      <section ref={giftRef} className="mb-16 reveal">
        <article
          className="rounded-[32px] p-8 md:p-10 text-center relative overflow-hidden border border-white/10"
          style={{ background: 'rgba(36,33,29,0.88)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', color: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-gold/20 blur-[60px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <svg className="mx-auto mb-5" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
              <rect x="3" y="8" width="18" height="12" rx="2" />
              <path d="M12 8v12" />
              <path d="M16 8c0-2.2-1.8-4-4-4s-4 1.8-4 4" />
            </svg>
            <p className="text-[13px] tracking-[0.2em] text-white/75 uppercase font-bold mb-3">Presentkort</p>
            <h2 className="font-serif text-2xl md:text-4xl text-white mb-4">
              Ge bort en upplevelse
              <br />av total frid
            </h2>
            <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
              Den perfekta presenten – ett presentkort ger friheten att välja sin egen upplevelse hos oss.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 max-w-3xl mx-auto">
              {GIFT_CARD_AMOUNTS.map(({ amount, featured }) => (
                <button
                  key={amount}
                  onClick={() => openGiftCard(amount)}
                  className={`rounded-2xl py-4 transition-colors ${
                    featured
                      ? 'border border-brand-gold/50 bg-brand-gold/10 hover:bg-brand-gold/20 shadow-[0_0_20px_rgba(201,169,110,0.15)]'
                      : 'border border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <p className={`font-serif text-xl md:text-2xl ${featured ? 'text-brand-gold' : 'text-white'}`}>
                    {amount.toLocaleString('sv-SE')}{' '}
                    <span className={`text-xs uppercase font-sans tracking-widest ${featured ? 'text-brand-gold/60' : 'text-white/50'}`}>kr</span>
                  </p>
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Valfritt belopp (ex. 800)"
                className="w-full md:w-2/3 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition text-center md:text-left [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={handleCustomGift}
                className="bg-gradient-to-br from-[#d4b06a] to-[#b8924d] text-white w-full md:w-1/3 min-h-[48px] rounded-xl text-[13px] font-bold uppercase tracking-widest transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2"
              >
                Köp Presentkort
              </button>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}
