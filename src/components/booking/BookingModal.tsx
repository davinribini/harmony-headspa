'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookingStore, PaymentMethod } from '@/store/useBookingStore'
import { TIME_SLOTS } from '@/lib/constants'

// ─── Design tokens ────────────────────────────────────────────────────────────

const INK   = '#1A1209'
const IVORY = '#FDFCF9'
const GOLD  = '#C9A96E'
const BODY  = '#6B5B45'

// ─── GA4 DataLayer ────────────────────────────────────────────────────────────

declare global { interface Window { dataLayer: Record<string, unknown>[] } }

interface GA4PurchasePayload {
  event: 'purchase'
  ecommerce: {
    transaction_id: string; value: number; currency: 'SEK'
    items: { item_id: string; item_name: string; item_category: string; price: number; quantity: 1 }[]
  }
}

function pushToDataLayer(payload: GA4PurchasePayload): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload as unknown as Record<string, unknown>)
  if (process.env.NODE_ENV === 'development') {
    console.group('%c[GA4] purchase', 'color:#C9A96E;font-weight:bold;font-family:monospace;')
    console.log('order →', payload.ecommerce.transaction_id)
    console.log('value →', payload.ecommerce.value, 'SEK')
    console.groupEnd()
  }
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

const SV_DAYS = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör']

function getUpcomingDates(count = 14) {
  const dates: { date: Date; label: string; iso: string }[] = []
  const today = new Date(); today.setHours(0, 0, 0, 0)
  for (let i = 0; i < count; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i)
    dates.push({ date: d, label: i === 0 ? 'Idag' : i === 1 ? 'Imorgon' : SV_DAYS[d.getDay()], iso: d.toISOString().split('T')[0] })
  }
  return dates
}

function formatDateLabel(iso: string) {
  if (!iso) return ''
  return new Date(iso + 'T00:00:00').toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' })
}

function formatPrice(price: number) {
  return price === 0 ? 'På plats' : price.toLocaleString('sv-SE') + ' kr'
}

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isEmailValid = (v: string) => EMAIL_RE.test(v.trim())
const isPhoneValid = (v: string) => v.replace(/\D/g, '').length >= 7

function fmtCardNumber(val: string) { const d = val.replace(/\D/g, '').slice(0, 16); return d.replace(/(\d{4})(?=\d)/g, '$1 ') }
function fmtExpiry(val: string) { const d = val.replace(/\D/g, '').slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d }

// ─── Step labels ──────────────────────────────────────────────────────────────

function getStepMeta(step: number, isGiftCard: boolean, isEpassi: boolean) {
  if (isGiftCard) return { label: `Steg ${step === 2 ? 1 : 2} av 2`, title: step === 2 ? 'Dina uppgifter' : 'Betalning' }
  const titles: Record<number, string> = { 1: 'Välj Datum & Tid', 2: 'Dina uppgifter', 3: 'Betalning' }
  return { label: `Steg ${step} av 3`, title: titles[step] ?? '' }
}

// ─── BankID Logo ──────────────────────────────────────────────────────────────

function BankIdLogo({ size = 36, pulse = false }: { size?: number; pulse?: boolean }) {
  return (
    <motion.div
      animate={pulse ? { scale: [1, 1.02, 1] } : undefined}
      transition={pulse ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <Image
        src="/bankid.png"
        alt="BankID"
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
      />
    </motion.div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      className="animate-spin shrink-0"
      strokeLinecap="round"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

// ─── Shared input style ───────────────────────────────────────────────────────

const inputCls = 'w-full border rounded-lg px-5 py-4 text-sm font-sans transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-1 placeholder:text-[#6B5B45]'
const inputStyle = { background: IVORY, color: INK, borderColor: 'rgba(26,18,9,0.15)' }

// ─── Action button ────────────────────────────────────────────────────────────

function ActionBtn({
  onClick, disabled = false, children, secondary = false,
}: { onClick: () => void; disabled?: boolean; children: React.ReactNode; secondary?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? (secondary ? {} : { backgroundColor: GOLD, color: IVORY }) : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.2 }}
      className="px-6 min-h-[48px] font-sans text-[13px] uppercase tracking-[0.20em] font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2"
      style={{
        background: secondary ? 'rgba(26,18,9,0.06)' : INK,
        color:      secondary ? INK : IVORY,
        border:     secondary ? `1px solid rgba(26,18,9,0.12)` : '1px solid transparent',
      }}
    >
      {children}
    </motion.button>
  )
}

// ─── Service Summary ──────────────────────────────────────────────────────────

function ServiceSummary() {
  const { selectedService, description, duration, price } = useBookingStore()
  return (
    <div
      className="rounded-xl p-5 mb-8"
      style={{ background: 'rgba(201,169,110,0.07)', border: `1px solid rgba(201,169,110,0.22)` }}
    >
      <h4 className="font-serif text-base mb-1" style={{ color: INK }}>{selectedService}</h4>
      <p className="font-sans text-xs font-light leading-relaxed mb-5" style={{ color: '#6B5B45' }}>{description}</p>
      <div className="flex justify-between items-end pt-4" style={{ borderTop: `1px solid rgba(201,169,110,0.15)` }}>
        <div>
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-1" style={{ color: INK }}>Tid</p>
          <p className="font-sans text-sm font-semibold" style={{ color: INK }}>{duration}</p>
        </div>
        <div className="text-right">
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-1" style={{ color: INK }}>Pris</p>
          <p className="font-serif text-xl font-semibold" style={{ color: INK }}>{formatPrice(price)}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Step 1 — Date & Time ─────────────────────────────────────────────────────

function Step1() {
  const { date, time, setDate, setTime, setStep, bookedSlots } = useBookingStore()
  const dates = getUpcomingDates(14)
  const canProceed = date && time

  return (
    <div>
      <ServiceSummary />

      <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-4" style={{ color: INK }}>
        1 · Välj Datum
      </p>
      <div className="flex gap-2.5 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {dates.map(({ label, iso, date: d }, i) => {
          const selected = iso === date
          return (
            <button
              key={iso}
              onClick={() => setDate(iso)}
              className="flex-shrink-0 flex flex-col items-center min-w-[72px] p-3.5 rounded-xl border transition-all"
              style={{
                background:  selected ? 'rgba(201,169,110,0.10)' : IVORY,
                borderColor: selected ? GOLD : 'rgba(26,18,9,0.12)',
                color:       selected ? INK  : '#6B5B45',
              }}
            >
              <span className="font-sans text-[13px] font-bold uppercase tracking-wide" style={{ color: selected ? INK : (i === 0 ? BODY : 'rgba(26,18,9,0.45)') }}>
                {label}
              </span>
              <span className="font-serif text-2xl mt-1" style={{ color: selected ? INK : INK }}>
                {d.getDate()}
              </span>
            </button>
          )
        })}
      </div>

      <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-4 mt-2" style={{ color: INK }}>
        2 · Välj Tid
      </p>
      <div className="grid grid-cols-3 gap-2.5">
        {TIME_SLOTS.map((slot) => {
          const selected = slot === time
          const isBooked = date ? bookedSlots.includes(`${date}|${slot}`) : false
          return (
            <button
              key={slot}
              onClick={() => !isBooked && setTime(slot)}
              disabled={!date || isBooked}
              className="py-3.5 rounded-xl border text-sm font-semibold transition-all relative"
              style={{
                background:  isBooked ? 'rgba(26,18,9,0.04)' : selected ? INK : IVORY,
                borderColor: isBooked ? 'rgba(26,18,9,0.08)' : selected ? INK : 'rgba(26,18,9,0.12)',
                color:       isBooked ? 'rgba(26,18,9,0.25)' : selected ? IVORY : INK,
                opacity:     !date && !isBooked ? 0.35 : 1,
                cursor:      (isBooked || !date) ? 'not-allowed' : 'pointer',
                textDecoration: isBooked ? 'line-through' : 'none',
              }}
            >
              {slot}
              {isBooked && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-[7px] font-black uppercase tracking-widest px-1 py-0.5 rounded-full leading-none"
                  style={{ background: INK, color: IVORY }}
                >
                  Bokad
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-10">
        <ActionBtn onClick={() => setStep(2)} disabled={!canProceed}>
          Dina uppgifter →
        </ActionBtn>
      </div>
    </div>
  )
}

// ─── Step 2 — Customer Details ────────────────────────────────────────────────

function Step2() {
  const { date, time, customerDetails, setCustomerDetails, setStep, isGiftCard } = useBookingStore()
  const [touched, setTouched] = useState({ name: false, phone: false, email: false })

  const nameValid  = customerDetails.name.trim().length > 0
  const emailValid = isEmailValid(customerDetails.email)
  const phoneValid = isPhoneValid(customerDetails.phone)
  const canProceed = nameValid && emailValid && phoneValid

  const markTouched = (field: keyof typeof touched) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  const getError = (field: 'name' | 'phone' | 'email') => {
    if (!touched[field]) return null
    if (field === 'name'  && !nameValid)  return 'Ange ditt för- och efternamn'
    if (field === 'phone' && !phoneValid) return 'Ange ett giltigt telefonnummer (minst 7 siffror)'
    if (field === 'email' && !emailValid) return 'Ange en giltig e-postadress'
    return null
  }

  const fields: { id: string; label: string; type: string; placeholder: string; key: 'name' | 'phone' | 'email' }[] = [
    { id: 'name',  label: 'För & Efternamn', type: 'text',  placeholder: 'T.ex. Anna Andersson', key: 'name'  },
    { id: 'phone', label: 'Telefonnummer',    type: 'tel',   placeholder: '070 123 45 67',        key: 'phone' },
    { id: 'email', label: 'E-post',           type: 'email', placeholder: 'anna@mail.com',         key: 'email' },
  ]

  return (
    <div>
      {!isGiftCard && (
        <div
          className="rounded-xl p-5 mb-8"
          style={{ background: 'rgba(201,169,110,0.07)', border: `1px solid rgba(201,169,110,0.22)` }}
        >
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-1.5" style={{ color: INK }}>Din valda tid</p>
          <p className="font-serif text-base capitalize" style={{ color: INK }}>
            {formatDateLabel(date)} kl. {time}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {fields.map(({ id, label, type, placeholder, key }) => {
          const error = getError(key)
          return (
            <div key={id}>
              <label
                htmlFor={id}
                className="block font-sans text-[13px] font-semibold uppercase tracking-[0.18em] mb-2 pl-0.5"
                style={{ color: INK }}
              >
                {label}
              </label>
              <input
                id={id}
                type={type}
                value={customerDetails[key]}
                onChange={(e) => setCustomerDetails({ [key]: e.target.value })}
                onBlur={() => markTouched(key)}
                placeholder={placeholder}
                className={inputCls}
                style={{
                  ...inputStyle,
                  borderColor: error ? '#c0392b' : 'rgba(26,18,9,0.15)',
                  boxShadow:   error ? 'none' : undefined,
                }}
              />
              {error && (
                <p className="font-sans text-xs mt-1.5 pl-0.5 flex items-center gap-1.5" style={{ color: '#c0392b' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex gap-3 mt-10">
        {!isGiftCard && (
          <ActionBtn onClick={() => setStep(1)} secondary>Tillbaka</ActionBtn>
        )}
        <div className="flex-1">
          <ActionBtn onClick={() => setStep(3)} disabled={!canProceed}>
            Till Betalning →
          </ActionBtn>
        </div>
      </div>
    </div>
  )
}

// ─── PayBox ───────────────────────────────────────────────────────────────────

function PayBox({
  value, label, logo, selected, locked, isEpassi: isEpassiOpt, bankId, onSelect,
}: {
  value: PaymentMethod; label: string; logo: React.ReactNode
  selected: boolean; locked?: boolean; isEpassi?: boolean; bankId?: boolean
  onSelect: (v: PaymentMethod) => void
}) {
  return (
    <button
      type="button"
      onClick={() => !locked && onSelect(value)}
      className="w-full flex items-center justify-between rounded-xl p-4 border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-1"
      style={{
        background:   IVORY,
        borderColor:  selected ? GOLD : 'rgba(26,18,9,0.10)',
        cursor:       locked ? 'default' : 'pointer',
        boxShadow:    selected ? `0 0 0 1px ${GOLD}22` : 'none',
      }}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-10 flex items-center justify-center shrink-0">{logo}</div>
        <div className="flex flex-col items-start gap-1">
          <span className="font-sans text-sm font-semibold" style={{ color: INK }}>{label}</span>
          {bankId && (
            <div className="flex items-center gap-1.5">
              <Image src="/bankid.png" alt="BankID" width={16} height={16} className="object-contain opacity-80" />
              <span className="font-sans text-[11px] font-medium" style={{ color: 'rgba(26,18,9,0.45)' }}>
                Verifieras via BankID
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
        style={{ borderColor: selected ? GOLD : 'rgba(26,18,9,0.22)' }}
      >
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: GOLD }} />
        )}
      </div>
    </button>
  )
}

// ─── Step 3 — Payment ─────────────────────────────────────────────────────────

function Step3() {
  const {
    price, paymentMethod, setPaymentMethod, setStep, isGiftCard, isEpassi,
    customerDetails, selectedService, date, time, duration, addBookedSlot,
  } = useBookingStore()

  const [isProcessing, setIsProcessing] = useState(false)
  const [loadingMsg,   setLoadingMsg]   = useState('')
  const [swishPhone,   setSwishPhone]   = useState(customerDetails.phone)
  const [cardNumber,   setCardNumber]   = useState('')
  const [cardExpiry,   setCardExpiry]   = useState('')
  const [cardCvc,      setCardCvc]      = useState('')

  const processPayment = () => {
    let delay = 1500
    let msg   = 'Bearbetar...'
    if (paymentMethod === 'swish') { delay = 3500; msg = 'Ansluter till Swish... Godkänn i BankID-appen.' }
    else if (paymentMethod === 'card')    { delay = 2200; msg = 'Verifierar via BankID...' }
    else if (paymentMethod === 'invoice') { delay = 2000; msg = 'Ansluter till säker betalning...' }

    setLoadingMsg(msg)
    setIsProcessing(true)

    const orderId = Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase()

    const payload = {
      orderId:   `HHS-${orderId}`,
      timestamp: new Date().toISOString(),
      customer:  { name: customerDetails.name, email: customerDetails.email, phone: customerDetails.phone },
      booking: {
        service:  { title: selectedService, price, priceFormatted: formatPrice(price), duration },
        dateTime: { date, time, label: date ? `${formatDateLabel(date)} kl. ${time}` : 'Presentkort' },
      },
      payment: { method: paymentMethod, status: 'pending', currency: 'SEK', amount: price },
      meta:    { source: 'harmony-headspa-web', isGiftCard, isEpassi },
    }

    // Fire-and-forget — never blocks the booking success flow
    fetch('/api/booking', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    }).catch((err) => console.warn('[booking] email dispatch failed:', err))

    setTimeout(() => {
      if (!isGiftCard && date && time) addBookedSlot(`${date}|${time}`)

      pushToDataLayer({
        event: 'purchase',
        ecommerce: {
          transaction_id: payload.orderId,
          value: price, currency: 'SEK',
          items: [{
            item_id: selectedService.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '').slice(0, 40),
            item_name: selectedService,
            item_category: isGiftCard ? 'Presentkort' : isEpassi ? 'Epassi / Friskvård' : 'Behandling',
            price, quantity: 1,
          }],
        },
      })

      setIsProcessing(false)
      useBookingStore.getState().setStep(4)
    }, delay)
  }

  const btnLabel = isGiftCard
    ? 'Köp Presentkort'
    : isEpassi
    ? 'Bekräfta Epassi-bokning'
    : paymentMethod === 'swish'
    ? 'Betala med Swish'
    : paymentMethod === 'card'
    ? 'Betala säkert'
    : 'Slutför bokning'

  return (
    <div>
      {/* Price summary */}
      <div
        className="text-center rounded-xl py-7 mb-8"
        style={{ background: 'rgba(201,169,110,0.07)', border: `1px solid rgba(201,169,110,0.20)` }}
      >
        <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-2" style={{ color: INK }}>Att betala</p>
        <p className="font-serif text-5xl font-semibold leading-none" style={{ color: INK }}>{formatPrice(price)}</p>
      </div>

      <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-4" style={{ color: INK }}>
        Välj betalsätt
      </p>

      {/* Payment selectors */}
      <div className="space-y-3 mb-5">
        {isEpassi ? (
          <PayBox
            value="epassi" label="Friskvårdsbidrag (Epassi)" selected isEpassi locked
            logo={
              <div className="w-full h-full flex items-center justify-center rounded-lg" style={{ background: 'rgba(26,18,9,0.04)', border: '1px solid rgba(26,18,9,0.08)' }}>
                <span className="font-sans font-black text-sm tracking-tight" style={{ color: INK }}>epassi</span>
              </div>
            }
            onSelect={setPaymentMethod}
          />
        ) : (
          <>
            <PayBox
              value="swish" label="Swish" selected={paymentMethod === 'swish'} onSelect={setPaymentMethod}
              bankId
              logo={<Image src="/Swish logo.jpg" alt="Swish betalning" width={64} height={40} className="h-full w-auto object-contain mix-blend-multiply" />}
            />
            <PayBox
              value="card" label="Kortbetalning" selected={paymentMethod === 'card'} onSelect={setPaymentMethod}
              bankId
              logo={
                <div className="w-full h-full flex items-center justify-center rounded-lg" style={{ background: 'rgba(26,18,9,0.04)', border: '1px solid rgba(26,18,9,0.08)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.7">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                  </svg>
                </div>
              }
            />
            <PayBox
              value="invoice" label="Faktura / Qliro" selected={paymentMethod === 'invoice'} onSelect={setPaymentMethod}
              logo={
                <div className="w-full h-full flex items-center justify-center p-1 rounded-lg" style={{ background: 'rgba(26,18,9,0.04)', border: '1px solid rgba(26,18,9,0.08)' }}>
                  <Image src="/qliro-700x500-1.jpg" alt="Qliro delbetalning" width={64} height={40} className="h-full w-auto object-contain mix-blend-multiply" />
                </div>
              }
            />
          </>
        )}
      </div>

      {/* ── Payment detail panels ───────────────────────────────────────── */}

      {paymentMethod === 'swish' && !isProcessing && (
        <div className="mb-6 rounded-xl p-5 space-y-3" style={{ background: 'rgba(201,169,110,0.06)', border: `1px solid rgba(201,169,110,0.18)` }}>
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em]" style={{ color: INK }}>Swish-nummer</p>
          <input
            type="tel" value={swishPhone}
            onChange={(e) => setSwishPhone(e.target.value)}
            placeholder="070 123 45 67"
            className={inputCls} style={inputStyle}
          />
          <p className="font-sans text-sm font-light leading-relaxed" style={{ color: BODY }}>
            En betalningsförfrågan skickas till ditt Swish-nummer. Godkänn i BankID-appen.
          </p>
        </div>
      )}

      {paymentMethod === 'swish' && isProcessing && (
        <div className="mb-6 rounded-xl p-7 flex flex-col items-center gap-4" style={{ background: 'rgba(201,169,110,0.06)', border: `1px solid rgba(201,169,110,0.18)` }}>
          {/* BankID logo — pulsing to signal live communication */}
          <BankIdLogo size={40} pulse />

          {/* Divider */}
          <div style={{ width: 1, height: 12, background: 'rgba(26,18,9,0.10)' }} />

          {/* Spinner */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.12)', color: GOLD }}>
            <Spinner size={22} />
          </div>

          <p className="font-serif text-base text-center" style={{ color: INK }}>Ansluter till Swish</p>
          <p className="font-sans text-xs font-light text-center leading-relaxed" style={{ color: BODY }}>
            En förfrågan har skickats till <strong style={{ color: INK }}>{swishPhone}</strong>.<br />
            Godkänn betalningen i BankID-appen.
          </p>
        </div>
      )}

      {paymentMethod === 'card' && !isProcessing && (
        <div className="mb-6 rounded-xl p-5 space-y-4" style={{ background: IVORY, border: `1px solid rgba(26,18,9,0.10)` }}>
          <div>
            <label className="block font-sans text-[13px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: INK }}>Kortnummer</label>
            <input type="text" inputMode="numeric" value={cardNumber}
              onChange={(e) => setCardNumber(fmtCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456" maxLength={19}
              className={`${inputCls} font-mono tracking-widest`} style={inputStyle}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block font-sans text-[13px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: INK }}>MM/ÅÅ</label>
              <input type="text" inputMode="numeric" value={cardExpiry}
                onChange={(e) => setCardExpiry(fmtExpiry(e.target.value))}
                placeholder="MM/ÅÅ" maxLength={5}
                className={`${inputCls} font-mono`} style={inputStyle}
              />
            </div>
            <div className="w-28">
              <label className="block font-sans text-[13px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: INK }}>CVC</label>
              <input type="text" inputMode="numeric" value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123" maxLength={4}
                className={`${inputCls} font-mono`} style={inputStyle}
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-sans text-[13px] font-semibold" style={{ color: INK }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Krypterat med 256-bit SSL
          </div>
        </div>
      )}

      {paymentMethod === 'card' && isProcessing && (
        <div className="mb-6 rounded-xl p-7 flex flex-col items-center gap-4" style={{ background: 'rgba(201,169,110,0.06)', border: `1px solid rgba(201,169,110,0.18)` }}>
          {/* BankID logo — pulsing to signal live BankID verification */}
          <BankIdLogo size={40} pulse />

          {/* Divider */}
          <div style={{ width: 1, height: 12, background: 'rgba(26,18,9,0.10)' }} />

          {/* Spinner */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.12)', color: GOLD }}>
            <Spinner size={22} />
          </div>

          <p className="font-serif text-base text-center" style={{ color: INK }}>Verifierar via BankID</p>
          <p className="font-sans text-xs font-light text-center leading-relaxed" style={{ color: BODY }}>
            Öppna BankID-appen och godkänn<br />
            för att slutföra kortbetalningen.
          </p>
        </div>
      )}

      {paymentMethod === 'invoice' && !isProcessing && (
        <div className="mb-6 rounded-xl p-5 flex items-start gap-4" style={{ background: IVORY, border: `1px solid rgba(26,18,9,0.10)` }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(201,169,110,0.10)', color: GOLD }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
            </svg>
          </div>
          <div>
            <p className="font-serif text-sm mb-1" style={{ color: INK }}>Betala via Qliro</p>
            <p className="font-sans text-sm font-light leading-relaxed" style={{ color: '#6B5B45' }}>
              Du omdirigeras till Qliros säkra betalsida för att välja delbetalning eller faktura.
            </p>
          </div>
        </div>
      )}

      {/* Action row */}
      <div className="flex gap-3">
        <ActionBtn onClick={() => setStep(2)} disabled={isProcessing} secondary>
          Tillbaka
        </ActionBtn>
        <div className="flex-1">
          <motion.button
            onClick={processPayment}
            disabled={isProcessing}
            whileHover={!isProcessing ? { backgroundColor: GOLD, color: IVORY } : undefined}
            whileTap={!isProcessing ? { scale: 0.97 } : undefined}
            transition={{ duration: 0.2 }}
            className="w-full min-h-[48px] font-sans text-[13px] uppercase tracking-[0.20em] font-semibold flex items-center justify-center gap-3 rounded-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2"
            style={{ background: INK, color: IVORY, border: '1px solid transparent' }}
          >
            {isProcessing ? (
              <>
                <Spinner size={16} />
                <span>{loadingMsg}</span>
              </>
            ) : (
              btnLabel
            )}
          </motion.button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-5 font-sans text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'rgba(26,18,9,0.55)' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        Säker &amp; Krypterad Checkout
      </div>
    </div>
  )
}

// ─── Step 4 — Success ─────────────────────────────────────────────────────────

function Step4() {
  const { customerDetails, selectedService, date, time, closeBooking } = useBookingStore()

  useEffect(() => {
    import('canvas-confetti').then(({ default: confetti }) => {
      const fire = (ratio: number, opts: Parameters<typeof confetti>[0]) =>
        confetti({ origin: { y: 0.62 }, colors: ['#C9A96E', '#D4B06A', '#e8d5a3', '#FDFCF9', '#1A1209'], ...opts, particleCount: Math.floor(200 * ratio) })
      fire(0.25, { spread: 26, startVelocity: 55 })
      fire(0.20, { spread: 60 })
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
      fire(0.10, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
      fire(0.10, { spread: 120, startVelocity: 45 })
    })
  }, [])

  const dateTimeLabel = date ? `${formatDateLabel(date)} kl. ${time}` : 'Presentkort'

  return (
    <div className="text-center py-6">
      {/* Gold success mark */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
        style={{ background: 'rgba(201,169,110,0.12)', border: `2px solid rgba(201,169,110,0.40)` }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.24em] mb-4" style={{ color: '#6B5B45' }}>
        Bokning bekräftad
      </p>

      <h3 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: INK }}>
        Din oas väntar, {customerDetails.name.split(' ')[0]}.
      </h3>

      <p className="font-sans text-sm font-light leading-relaxed mb-10" style={{ color: '#6B5B45' }}>
        Tack för din bokning.<br />
        En bekräftelse har skickats till{' '}
        <strong style={{ color: INK }}>{customerDetails.email}</strong>.
      </p>

      {/* Booking summary card */}
      <div
        className="rounded-xl p-6 mb-8 text-left"
        style={{ background: 'rgba(201,169,110,0.07)', border: `1px solid rgba(201,169,110,0.20)` }}
      >
        <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-4" style={{ color: INK }}>
          Bokningsdetaljer
        </p>
        <p className="font-serif text-xl mb-1.5" style={{ color: INK }}>{selectedService}</p>
        <p className="font-sans text-sm font-light capitalize" style={{ color: '#6B5B45' }}>{dateTimeLabel}</p>
      </div>

      <ActionBtn onClick={closeBooking} secondary>
        Stäng fönstret
      </ActionBtn>
    </div>
  )
}

// ─── Modal shell ──────────────────────────────────────────────────────────────

export default function BookingModal() {
  const { isOpen, currentStep, isGiftCard, isEpassi, closeBooking, hydrateBookedSlots } = useBookingStore()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => { hydrateBookedSlots() }, [hydrateBookedSlots])
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [isOpen])

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeBooking()
  }, [closeBooking])

  if (!isOpen) return null

  const isSuccess = currentStep === 4
  const { label, title } = isSuccess ? { label: '', title: '' } : getStepMeta(currentStep, isGiftCard, isEpassi)

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0" style={{ background: 'rgba(26,18,9,0.75)', backdropFilter: 'blur(8px)' }} />

        {/* Panel */}
        <motion.div
          className="relative w-full sm:max-w-[480px] flex flex-col"
          style={{
            background:   IVORY,
            borderRadius: '16px 16px 16px 16px',
            boxShadow:    '0 24px 80px rgba(26,18,9,0.35)',
            maxHeight:    '90vh',
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          {!isSuccess && (
            <div
              className="flex justify-between items-center p-7 md:p-8 shrink-0"
              style={{ borderBottom: `1px solid rgba(201,169,110,0.15)` }}
            >
              <div>
                <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.20em] mb-1.5" style={{ color: '#6B5B45' }}>{label}</p>
                <h2 className="font-serif text-2xl md:text-3xl" style={{ color: INK }}>{title}</h2>
              </div>
              <button
                onClick={closeBooking}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-1"
                style={{ background: 'rgba(26,18,9,0.06)', color: INK }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(26,18,9,0.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(26,18,9,0.06)')}
                aria-label="Stäng"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          )}

          {/* Body */}
          <div className="overflow-y-auto p-7 md:p-8 pb-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
            {currentStep === 4 && <Step4 />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
