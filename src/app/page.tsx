import StickyHeader from '@/components/StickyHeader'
import Hero from '@/components/Hero'
import About from '@/components/About'
import EpassiBanner from '@/components/EpassiBanner'
import ServiceGrid from '@/components/ServiceGrid'
import GiftCardSection from '@/components/GiftCardSection'
import TrustSection from '@/components/TrustSection'
import Footer from '@/components/Footer'
import BookingModal from '@/components/booking/BookingModal'
import BrandIntro from '@/components/layout/BrandIntro'
import RitualSteps from '@/components/sections/RitualSteps'
import Contact from '@/components/sections/Contact'
import Testimonials from '@/components/sections/Testimonials'
import MobileBookingBar from '@/components/MobileBookingBar'

export default function Home() {
  return (
    <>
      {/* Texture layers */}
      <div className="mesh" aria-hidden />
      <div className="grain" aria-hidden />

      {/* Cinematic video preloader */}
      <BrandIntro />

      <StickyHeader />

      <main className="relative z-10">

        {/* ── Centered content column ─────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
          <Hero />
          <About />
        </div>

        {/* ── Full-width ink section — The Ritual ─────────────────────── */}
        <RitualSteps />

        {/* ── Centered content column resumes ─────────────────────────── */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
          <EpassiBanner />
          <ServiceGrid />
          <GiftCardSection />
          <TrustSection />
        </div>

        {/* ── Full-width ivory testimonials — typographic quotes ──────── */}
        <Testimonials />

        {/* ── Full-width ivory contact — editorial invitation ──────────── */}
        <Contact />

        {/* ── Full-width ink footer — bookend ─────────────────────────── */}
        <Footer />

      </main>

      <MobileBookingBar />
      <BookingModal />
    </>
  )
}
