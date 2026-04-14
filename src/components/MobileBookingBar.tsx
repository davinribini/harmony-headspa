'use client'

export default function MobileBookingBar() {
  const scrollToServices = () => {
    document.getElementById('behandlingar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-30 bg-gradient-to-t from-[#EDE7DA] to-transparent pointer-events-none">
      <div
        className="rounded-[24px] p-2 shadow-2xl border border-white/80 pointer-events-auto"
        style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)' }}
      >
        <button
          onClick={scrollToServices}
          className="bg-[#1A1209] text-[#FDFCF9] w-full min-h-[56px] rounded-[18px] text-[13px] font-bold uppercase tracking-widest shadow-[0_4px_12px_rgba(26,18,9,0.22)] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2"
        >
          Boka din upplevelse
        </button>
      </div>
    </div>
  )
}
