export interface Service {
  id: string
  title: string
  price: number
  duration: string
  description: string
  badges?: string[]
  variant?: 'dark' | 'light' | 'warm' | 'featured'
  badge?: string
}

export interface GiftCardAmount {
  amount: number
  featured?: boolean
}

export const SINGLES: Service[] = [
  {
    id: 'classic-calming',
    title: 'Classic Calming Head Spa',
    price: 999,
    duration: '60 minuter',
    description:
      'Vår mest älskade behandling. Djup avslappning med Paul Mitchell & Weleda Arnica Oil — en 60-minuters resa som löser upp spänningar, återställer skalphälsan och försätter sinnet i total harmoni.',
    badges: ['Paul Mitchell', 'Weleda', 'Arnica Oil'],
    variant: 'featured',
    badge: 'Vår Signaturbehandling',
  },
  {
    id: 'harmony-special',
    title: 'Harmony Special Japanese Head Spa',
    price: 1199,
    duration: '75 minuter',
    description:
      'Djuprengöring, vattenterapi och skalpanalys. Den ultimata behandlingen för dig som vill ge din hårbotten total återhämtning.',
    badges: ['Vattenterapi', 'Skalpanalys', 'Shiatsu'],
    variant: 'light',
    badge: 'Premium',
  },
  {
    id: 'get-to-know',
    title: 'Get To Know Head Spa',
    price: 649,
    duration: '40 minuter',
    description:
      'Introduktionen till headspa-världen. Hårbottenmassage, rengöring och lugnande inpackning.',
    variant: 'light',
  },
]

export const DUOS: Service[] = [
  {
    id: 'duo-get-to-know',
    title: 'Duo Get To Know',
    price: 1299,
    duration: '40 minuter / person',
    description: 'Delad introduktion till headspa. Djuprengöring för två personer i samma rum.',
    variant: 'light',
  },
  {
    id: 'duo-classic',
    title: 'Duo Classic',
    price: 1999,
    duration: '60 minuter / person',
    description: 'Djup avslappning med Paul Mitchell och Weleda för två.',
    variant: 'light',
  },
  {
    id: 'duo-harmony-special',
    title: 'Duo Harmony Special',
    price: 2399,
    duration: '75 minuter / person',
    description:
      'Vår exklusiva signaturbehandling anpassad för två personer. Total lyx och återhämtning sida vid sida.',
    variant: 'warm',
    badge: 'Premium',
  },
]

export const GIFT_CARD_AMOUNTS: GiftCardAmount[] = [
  { amount: 1000 },
  { amount: 1500, featured: true },
  { amount: 2000 },
]

export const SURPRISE_PACKAGE: Service = {
  id: 'surprise-package',
  title: 'Överraskningspaketet',
  price: 1499,
  duration: '60 minuter',
  description:
    'En komplett lyxupplevelse som inkluderar headspa-behandling, bukett, choklad och ett doftljus.',
  variant: 'dark',
  badge: 'Exklusivt',
}

export const EPASSI_SERVICE: Service = {
  id: 'epassi',
  title: 'Friskvård (Epassi)',
  price: 0,
  duration: 'Enligt val',
  description:
    'Använd ditt Epassi-bidrag. Välj tid för behandlingen, betalningen regleras via Epassi-appen på plats.',
}

export const REVIEWS = [
  {
    author: 'Sofia L.',
    rating: 5,
    text: 'Absolut bästa upplevelsen jag haft på länge. Skalpmassagen var så djupgående och avslappnande — jag somnade nästan! Personalen är varm, närvärdig och otroligt professionell.',
  },
  {
    author: 'Maria E.',
    rating: 5,
    text: 'Harmony Special Japanese Head Spa är en helt otrolig behandling. Håret kändes mjukare och hårbotten friskare direkt efteråt. En riktig lyxupplevelse som jag unnar alla kvinnor.',
  },
  {
    author: 'Linnea K.',
    rating: 4.9,
    text: 'Att det är en renodlad women-only-salong gör hela skillnaden. Känslan av ro och trygghet är omedelbar. Vattenterapin är helt magisk — jag kommer definitivt tillbaka.',
  },
  {
    author: 'Emma R.',
    rating: 5,
    text: 'Hade aldrig provat headspa innan och är nu fullständigt förälskad. Hårbotten kändes som ny och jag sov som ett barn den natten. Rekommenderas varmt till alla!',
  },
  {
    author: 'Isabelle M.',
    rating: 4.8,
    text: 'Bokade Duo Classic med min syster och det var det bästa vi gjort tillsammans på år och dag. Varje detalj var genomtänkt och personalen fick oss att känna oss som drottningar.',
  },
  {
    author: 'Camilla S.',
    rating: 5,
    text: 'Från bokning till avslut — en felfri upplevelse. Dofterna, miljön och behandlingen transporterar en till ett annat ställe. Rent terapeutiskt. Det enda stället jag verkligen kopplar av.',
  },
  {
    author: 'Frida J.',
    rating: 4.9,
    text: 'Harmony Headspa är min nya självvårds-ritual. Paul Mitchell-produkterna lämnar håret glansigt i dagar. Skalpmassagen löser upp all spänning i axlarna. Hur har jag klarat mig utan detta?',
  },
  {
    author: 'Anna-Karin P.',
    rating: 5,
    text: 'Köpte Överraskningspaketet som present till mig själv — blommornas doft, den varma chokladen och doftljuset skapade en helhetskänsla jag aldrig upplevt på en salong. En absolut dröm.',
  },
]

export const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
]
