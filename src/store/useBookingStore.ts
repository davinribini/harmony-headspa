import { create } from 'zustand'

export type PaymentMethod = 'swish' | 'card' | 'invoice' | 'epassi'

export interface CustomerDetails {
  name: string
  phone: string
  email: string
}

const LS_KEY = 'hhs_booked_slots'

export interface BookingState {
  isOpen: boolean
  selectedService: string
  price: number
  duration: string
  description: string
  date: string
  time: string
  customerDetails: CustomerDetails
  paymentMethod: PaymentMethod
  isGiftCard: boolean
  isEpassi: boolean
  currentStep: 1 | 2 | 3 | 4
  bookedSlots: string[] // format: "YYYY-MM-DD|HH:MM"

  // Actions
  openBooking: (params: {
    title: string
    price: number
    duration: string
    description: string
  }) => void
  closeBooking: () => void
  setDate: (date: string) => void
  setTime: (time: string) => void
  setCustomerDetails: (details: Partial<CustomerDetails>) => void
  setPaymentMethod: (method: PaymentMethod) => void
  setStep: (step: 1 | 2 | 3 | 4) => void
  addBookedSlot: (slot: string) => void
  hydrateBookedSlots: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  isOpen: false,
  selectedService: '',
  price: 0,
  duration: '',
  description: '',
  date: '',
  time: '',
  customerDetails: { name: '', phone: '', email: '' },
  paymentMethod: 'swish',
  isGiftCard: false,
  isEpassi: false,
  currentStep: 1,
  bookedSlots: [],

  openBooking: ({ title, price, duration, description }) => {
    const isGiftCard = title.includes('Presentkort')
    const isEpassi = title.includes('Epassi')
    set({
      isOpen: true,
      selectedService: title,
      price,
      duration,
      description,
      isGiftCard,
      isEpassi,
      date: '',
      time: '',
      customerDetails: { name: '', phone: '', email: '' },
      paymentMethod: isEpassi ? 'epassi' : 'swish',
      currentStep: isGiftCard ? 2 : 1,
    })
  },

  closeBooking: () =>
    set({
      isOpen: false,
      currentStep: 1,
      date: '',
      time: '',
      customerDetails: { name: '', phone: '', email: '' },
    }),

  setDate: (date) => set({ date, time: '' }),
  setTime: (time) => set({ time }),

  setCustomerDetails: (details) =>
    set((state) => ({
      customerDetails: { ...state.customerDetails, ...details },
    })),

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  setStep: (step) => set({ currentStep: step }),

  // Persist a booked slot to localStorage and state
  addBookedSlot: (slot) =>
    set((state) => {
      const updated = Array.from(new Set([...state.bookedSlots, slot]))
      try { localStorage.setItem(LS_KEY, JSON.stringify(updated)) } catch { /* SSR guard */ }
      return { bookedSlots: updated }
    }),

  // Call once on client mount to rehydrate from localStorage
  hydrateBookedSlots: () => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      const slots: string[] = raw ? JSON.parse(raw) : []
      set({ bookedSlots: slots })
    } catch { /* ignore parse errors */ }
  },
}))
