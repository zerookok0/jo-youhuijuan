export type Lang = 'en' | 'ar'

export type Bi = { en: string; ar: string }

export type CategoryKey =
  | 'fashion'
  | 'beauty'
  | 'tech'
  | 'travel'
  | 'food'
  | 'home'

export type Accent = 'grape' | 'azure' | 'blush' | 'mint' | 'sun' | 'coral'

export type Deal = {
  id: string
  store: string
  monogram: string
  category: CategoryKey
  accent: Accent
  discount: Bi
  badge: Bi
  title: Bi
  terms: Bi
  code: string | null
  type: 'code' | 'deal'
  uses: number
  verifiedHoursAgo: number
  expiresInDays: number
  featured?: boolean
  hot?: boolean
  storeUrl: string
  /** ISO timestamp from the feed; drives the "verified Xh ago" label. */
  lastCheckedAt?: string
  /** ISO timestamp; when absent we fall back to expiresInDays. */
  expiresAt?: string
  /** Where this row came from — seed demo data or your live affiliate feed. */
  source?: 'seed' | 'feed'
}

export const categories: { key: CategoryKey; label: Bi; glyph: string }[] = [
  { key: 'fashion', label: { en: 'Fashion', ar: 'أزياء' }, glyph: 'shirt' },
  { key: 'beauty', label: { en: 'Beauty', ar: 'جمال' }, glyph: 'sparkles' },
  { key: 'tech', label: { en: 'Tech', ar: 'إلكترونيات' }, glyph: 'cpu' },
  { key: 'travel', label: { en: 'Travel', ar: 'سفر' }, glyph: 'plane' },
  { key: 'food', label: { en: 'Food & Delivery', ar: 'طعام' }, glyph: 'utensils' },
  { key: 'home', label: { en: 'Home', ar: 'منزل' }, glyph: 'sofa' },
]

const HOUR = 3_600_000
const DAY = 86_400_000

/**
 * Feed rows arrive with absolute timestamps; the seeded demo rows carry relative
 * values instead. Normalising both here means nothing downstream ever has to
 * care which source a row came from.
 */
export function normalise(deal: Deal): Deal {
  const now = Date.now()
  const lastCheckedAt =
    deal.lastCheckedAt ?? new Date(now - deal.verifiedHoursAgo * HOUR).toISOString()
  const expiresAt = deal.expiresAt ?? new Date(now + deal.expiresInDays * DAY).toISOString()

  return {
    ...deal,
    lastCheckedAt,
    expiresAt,
    source: deal.source ?? 'seed',
    verifiedHoursAgo: Math.max(0, Math.floor((now - new Date(lastCheckedAt).getTime()) / HOUR)),
    expiresInDays: Math.max(0, Math.ceil((new Date(expiresAt).getTime() - now) / DAY)),
  }
}

const rawSeed: Deal[] = [
  {
    id: 'iherb-25',
    store: 'iHerb',
    monogram: 'iH',
    category: 'beauty',
    accent: 'mint',
    discount: { en: '25% OFF', ar: 'خصم 25%' },
    badge: { en: 'First order', ar: 'أول طلب' },
    title: {
      en: 'Vitamins & supplements — 25% off your very first order',
      ar: 'فيتامينات ومكملات — خصم 25% على أول طلب لك',
    },
    terms: {
      en: 'New customers only. One use per account, excludes shipping fees.',
      ar: 'للعملاء الجدد فقط. استخدام واحد لكل حساب، لا يشمل رسوم الشحن.',
    },
    code: 'WAFF25',
    type: 'code',
    uses: 12480,
    verifiedHoursAgo: 2,
    expiresInDays: 12,
    featured: true,
    hot: true,
    storeUrl: 'https://www.iherb.com',
  },
  {
    id: 'temu-30',
    store: 'Temu',
    monogram: 'Te',
    category: 'fashion',
    accent: 'coral',
    discount: { en: '30% OFF', ar: 'خصم 30%' },
    badge: { en: 'New users', ar: 'مستخدم جديد' },
    title: {
      en: 'Extra 30% off your first Temu basket — no minimum spend',
      ar: 'خصم إضافي 30% على أول سلة من تيمو — بدون حد أدنى',
    },
    terms: {
      en: 'Applies to new accounts on the app. Stacks with selected store deals.',
      ar: 'ينطبق على الحسابات الجديدة في التطبيق. يُجمع مع عروض مختارة.',
    },
    code: 'WAFF30',
    type: 'code',
    uses: 21306,
    verifiedHoursAgo: 1,
    expiresInDays: 6,
    featured: true,
    hot: true,
    storeUrl: 'https://www.temu.com',
  },
  {
    id: 'shein-80',
    store: 'SHEIN',
    monogram: 'SH',
    category: 'fashion',
    accent: 'blush',
    discount: { en: 'Up to 80%', ar: 'حتى 80%' },
    badge: { en: 'Season sale', ar: 'تخفيضات الموسم' },
    title: {
      en: 'End-of-season clearance plus free shipping over 35 JOD',
      ar: 'تصفية نهاية الموسم مع شحن مجاني فوق 35 دينار',
    },
    terms: {
      en: 'Discount varies by item. Free shipping auto-applies at checkout.',
      ar: 'يختلف الخصم حسب المنتج. يُطبق الشحن المجاني تلقائياً عند الدفع.',
    },
    code: null,
    type: 'deal',
    uses: 31890,
    verifiedHoursAgo: 3,
    expiresInDays: 9,
    featured: true,
    storeUrl: 'https://ar.shein.com',
  },
  {
    id: 'aliexpress-60',
    store: 'AliExpress',
    monogram: 'AE',
    category: 'tech',
    accent: 'sun',
    discount: { en: 'Up to 60%', ar: 'حتى 60%' },
    badge: { en: 'Choice deals', ar: 'عروض مختارة' },
    title: {
      en: 'Choice Week: gadgets, cables and accessories up to 60% off',
      ar: 'أسبوع الاختيار: أجهزة وكابلات وملحقات بخصم يصل إلى 60%',
    },
    terms: {
      en: 'Prices reflect seller discount. Shipping calculated per item.',
      ar: 'الأسعار تعكس خصم البائع. يُحسب الشحن لكل منتج.',
    },
    code: 'WAFFAE6',
    type: 'code',
    uses: 18760,
    verifiedHoursAgo: 5,
    expiresInDays: 3,
    storeUrl: 'https://www.aliexpress.com',
  },
  {
    id: 'namshi-15',
    store: 'Namshi',
    monogram: 'NM',
    category: 'fashion',
    accent: 'grape',
    discount: { en: '15% OFF', ar: 'خصم 15%' },
    badge: { en: 'All customers', ar: 'لجميع العملاء' },
    title: {
      en: '15% off sneakers and everyday wear — stackable with markdowns',
      ar: 'خصم 15% على الأحذية والملابس اليومية — يُجمع مع التخفيضات',
    },
    terms: {
      en: 'Minimum basket 40 JOD. Excludes new-season drops.',
      ar: 'الحد الأدنى للسلة 40 دينار. لا يشمل إصدارات الموسم الجديد.',
    },
    code: 'NAM15WA',
    type: 'code',
    uses: 8420,
    verifiedHoursAgo: 4,
    expiresInDays: 18,
    storeUrl: 'https://www.namshi.com',
  },
  {
    id: 'farfetch-70',
    store: 'Farfetch',
    monogram: 'FF',
    category: 'fashion',
    accent: 'blush',
    discount: { en: 'Up to 70%', ar: 'حتى 70%' },
    badge: { en: 'Final sale', ar: 'تصفية نهائية' },
    title: {
      en: 'Designer archive sale — up to 70% off selected luxury pieces',
      ar: 'تصفية الأرشيف — خصم يصل إلى 70% على قطع فاخرة مختارة',
    },
    terms: {
      en: 'Limited stock. Duties included for Jordan delivery.',
      ar: 'كميات محدودة. الرسوم مشمولة للتوصيل داخل الأردن.',
    },
    code: null,
    type: 'deal',
    uses: 6310,
    verifiedHoursAgo: 6,
    expiresInDays: 4,
    storeUrl: 'https://www.farfetch.com',
  },
  {
    id: 'amazon-ae',
    store: 'Amazon AE',
    monogram: 'A',
    category: 'tech',
    accent: 'azure',
    discount: { en: 'AED 40 OFF', ar: 'خصم 40 درهم' },
    badge: { en: 'Prime members', ar: 'أعضاء برايم' },
    title: {
      en: 'AED 40 off electronics over AED 300 for Prime members',
      ar: 'خصم 40 درهم على الإلكترونيات فوق 300 درهم لأعضاء برايم',
    },
    terms: {
      en: 'Prime membership required. One redemption per account.',
      ar: 'يتطلب عضوية برايم. استخدام واحد لكل حساب.',
    },
    code: 'PRIME40AE',
    type: 'code',
    uses: 9950,
    verifiedHoursAgo: 7,
    expiresInDays: 21,
    storeUrl: 'https://www.amazon.ae',
  },
  {
    id: 'sephora-20',
    store: 'Sephora',
    monogram: 'SP',
    category: 'beauty',
    accent: 'blush',
    discount: { en: '20% OFF', ar: 'خصم 20%' },
    badge: { en: 'Beauty insiders', ar: 'عضوات بيوتي' },
    title: {
      en: 'Skincare week: 20% off serum and SPF favourites',
      ar: 'أسبوع العناية: خصم 20% على السيروم وواقي الشمس',
    },
    terms: {
      en: 'Applies to selected brands only, while stock lasts.',
      ar: 'ينطبق على ماركات مختارة فقط وحتى نفاد الكمية.',
    },
    code: 'GLOW20',
    type: 'code',
    uses: 7720,
    verifiedHoursAgo: 2,
    expiresInDays: 8,
    storeUrl: 'https://www.sephora.ae',
  },
  {
    id: 'noon-25',
    store: 'Noon',
    monogram: 'NO',
    category: 'home',
    accent: 'sun',
    discount: { en: '25% OFF', ar: 'خصم 25%' },
    badge: { en: 'Home essentials', ar: 'أساسيات المنزل' },
    title: {
      en: '25% off kitchen and storage essentials with free delivery',
      ar: 'خصم 25% على أدوات المطبخ والتخزين مع توصيل مجاني',
    },
    terms: {
      en: 'Minimum spend 50 JOD. Applies to noon Express items.',
      ar: 'الحد الأدنى 50 دينار. ينطبق على منتجات نون إكسبرس.',
    },
    code: 'NOR25HOME',
    type: 'code',
    uses: 11230,
    verifiedHoursAgo: 3,
    expiresInDays: 14,
    storeUrl: 'https://www.noon.com',
  },
  {
    id: 'booking-15',
    store: 'Booking.com',
    monogram: 'B.',
    category: 'travel',
    accent: 'azure',
    discount: { en: '15% OFF', ar: 'خصم 15%' },
    badge: { en: 'Genius deals', ar: 'عروض جينيوس' },
    title: {
      en: '15% off stays in Amman, Aqaba and the Dead Sea',
      ar: 'خصم 15% على الإقامة في عمّان والعقبة والبحر الميت',
    },
    terms: {
      en: 'Genius account required. Free cancellation on most properties.',
      ar: 'يتطلب حساب جينيوس. إلغاء مجاني في معظم العقارات.',
    },
    code: null,
    type: 'deal',
    uses: 15640,
    verifiedHoursAgo: 1,
    expiresInDays: 30,
    featured: true,
    storeUrl: 'https://www.booking.com',
  },
  {
    id: 'careem-30',
    store: 'Careem',
    monogram: 'Ca',
    category: 'food',
    accent: 'mint',
    discount: { en: '30% OFF', ar: 'خصم 30%' },
    badge: { en: 'First ride', ar: 'أول رحلة' },
    title: {
      en: '30% off your first three rides with Careem in Jordan',
      ar: 'خصم 30% على أول ثلاث رحلات مع كريم في الأردن',
    },
    terms: {
      en: 'New app users. Maximum discount 3 JOD per ride.',
      ar: 'لمستخدمي التطبيق الجدد. الحد الأقصى للخصم 3 دينار لكل رحلة.',
    },
    code: 'WAFFRIDE',
    type: 'code',
    uses: 14210,
    verifiedHoursAgo: 5,
    expiresInDays: 11,
    storeUrl: 'https://www.careem.com',
  },
  {
    id: 'talabat-50',
    store: 'talabat',
    monogram: 't',
    category: 'food',
    accent: 'coral',
    discount: { en: '50% OFF', ar: 'خصم 50%' },
    badge: { en: 'First order', ar: 'أول طلب' },
    title: {
      en: 'Half price on your first food delivery in Amman',
      ar: 'نصف السعر على أول توصيل طعام في عمّان',
    },
    terms: {
      en: 'Minimum order 6 JOD. Selected restaurants only.',
      ar: 'الحد الأدنى للطلب 6 دينار. مطاعم مختارة فقط.',
    },
    code: 'HALF50',
    type: 'code',
    uses: 22480,
    verifiedHoursAgo: 2,
    expiresInDays: 5,
    hot: true,
    storeUrl: 'https://www.talabat.com',
  },
  {
    id: 'ikea-jordan',
    store: 'IKEA',
    monogram: 'IK',
    category: 'home',
    accent: 'azure',
    discount: { en: 'JOD 25 OFF', ar: 'خصم 25 دينار' },
    badge: { en: 'Family card', ar: 'بطاقة العائلة' },
    title: {
      en: 'JOD 25 off orders over JOD 150 with the IKEA Family card',
      ar: 'خصم 25 دينار على الطلبات فوق 150 دينار ببطاقة عائلة إيكيا',
    },
    terms: {
      en: 'In-store and online. One voucher per household per month.',
      ar: 'في المتجر وعبر الإنترنت. قسيمة واحدة لكل منزل شهرياً.',
    },
    code: null,
    type: 'deal',
    uses: 5890,
    verifiedHoursAgo: 8,
    expiresInDays: 25,
    storeUrl: 'https://www.ikea.com',
  },
  {
    id: 'samsung-50',
    store: 'Samsung',
    monogram: 'SS',
    category: 'tech',
    accent: 'grape',
    discount: { en: 'Up to 50%', ar: 'حتى 50%' },
    badge: { en: 'Trade-in bonus', ar: 'مكافأة استبدال' },
    title: {
      en: 'Galaxy sale — up to 50% off wearables with trade-in',
      ar: 'تخفيضات جالاكسي — حتى 50% على الأجهزة القابلة للارتداء مع الاستبدال',
    },
    terms: {
      en: 'Trade-in valuation applied after checkout verification.',
      ar: 'يُطبق تقييم الاستبدال بعد التحقق من الطلب.',
    },
    code: 'GALAXY50',
    type: 'code',
    uses: 4380,
    verifiedHoursAgo: 9,
    expiresInDays: 16,
    storeUrl: 'https://www.samsung.com',
  },
  {
    id: 'mumzworld-10',
    store: 'Mumzworld',
    monogram: 'MZ',
    category: 'home',
    accent: 'mint',
    discount: { en: '10% OFF', ar: 'خصم 10%' },
    badge: { en: 'Verified today', ar: 'موثّق اليوم' },
    title: {
      en: '10% off baby essentials and nursery furniture',
      ar: 'خصم 10% على مستشفيات الأطفال وأثاث الغرف',
    },
    terms: {
      en: 'Maximum discount 7.6 JOD. Excludes clearance.',
      ar: 'الحد الأقصى للخصم 7.6 دينار. لا يشمل التصفية.',
    },
    code: 'MUM10JO',
    type: 'code',
    uses: 6740,
    verifiedHoursAgo: 2,
    expiresInDays: 13,
    storeUrl: 'https://www.mumzworld.com',
  },
  {
    id: 'adidas-40',
    store: 'adidas',
    monogram: 'ad',
    category: 'fashion',
    accent: 'azure',
    discount: { en: '40% OFF', ar: 'خصم 40%' },
    badge: { en: 'Outlet', ar: 'أوت لت' },
    title: {
      en: 'Outlet drop: 40% off running shoes and training kits',
      ar: 'تخفيضات الأوت لت: 40% على أحذية الجري وأطقم التدريب',
    },
    terms: {
      en: 'Selected styles only. Free returns within 30 days.',
      ar: 'أنماط مختارة فقط. إرجاع مجاني خلال 30 يوماً.',
    },
    code: null,
    type: 'deal',
    uses: 9180,
    verifiedHoursAgo: 6,
    expiresInDays: 7,
    storeUrl: 'https://www.adidas.com',
  },
  {
    id: 'airbnb-10',
    store: 'Airbnb',
    monogram: 'Ab',
    category: 'travel',
    accent: 'blush',
    discount: { en: '10% OFF', ar: 'خصم 10%' },
    badge: { en: 'First booking', ar: 'أول حجز' },
    title: {
      en: '10% off your first apartment stay in Petra or Wadi Rum',
      ar: 'خصم 10% على أول إقامة في البتراء أو وادي رم',
    },
    terms: {
      en: 'New accounts. Valid on stays of 2 nights or more.',
      ar: 'حسابات جديدة. صالح للإقامة لليلتين أو أكثر.',
    },
    code: 'STAY10JO',
    type: 'code',
    uses: 5210,
    verifiedHoursAgo: 11,
    expiresInDays: 40,
    storeUrl: 'https://www.airbnb.com',
  },
  {
    id: 'ounass-15',
    store: 'Ounass',
    monogram: 'OU',
    category: 'beauty',
    accent: 'grape',
    discount: { en: '15% OFF', ar: 'خصم 15%' },
    badge: { en: 'Luxury beauty', ar: 'جمال فاخر' },
    title: {
      en: '15% off luxury fragrance and skincare edits',
      ar: 'خصم 15% على مختارات العطور والعناية الفاخرة',
    },
    terms: {
      en: 'Excludes limited-edition collaborations.',
      ar: 'لا يشمل الإصدارات المحدودة.',
    },
    code: 'OUN15',
    type: 'code',
    uses: 3960,
    verifiedHoursAgo: 10,
    expiresInDays: 20,
    storeUrl: 'https://www.ounass.ae',
  },
]

export const seedDeals: Deal[] = rawSeed.map(normalise)

/**
 * The rows the UI renders. Today these are seed rows; once
 * VITE_DEALS_FEED_URL is set the DealsProvider swaps in feed rows at runtime and
 * components read them from context instead of this constant.
 */
export const deals: Deal[] = seedDeals

export const accentStyles: Record<
  Accent,
  { text: string; border: string; bg: string; glow: string; dot: string }
> = {
  grape: {
    text: 'text-[#C4B0FF]',
    border: 'border-[#9E7FFF]/30',
    bg: 'bg-[#9E7FFF]/12',
    glow: 'from-[#9E7FFF]/22',
    dot: '#9E7FFF',
  },
  azure: {
    text: 'text-[#7DD3FC]',
    border: 'border-[#38BDF8]/30',
    bg: 'bg-[#38BDF8]/12',
    glow: 'from-[#38BDF8]/22',
    dot: '#38BDF8',
  },
  blush: {
    text: 'text-[#F9A8D4]',
    border: 'border-[#F472B6]/30',
    bg: 'bg-[#F472B6]/12',
    glow: 'from-[#F472B6]/22',
    dot: '#F472B6',
  },
  mint: {
    text: 'text-[#6EE7B7]',
    border: 'border-[#10B981]/30',
    bg: 'bg-[#10B981]/12',
    glow: 'from-[#10B981]/22',
    dot: '#10B981',
  },
  sun: {
    text: 'text-[#FCD34D]',
    border: 'border-[#F59E0B]/30',
    bg: 'bg-[#F59E0B]/12',
    glow: 'from-[#F59E0B]/22',
    dot: '#F59E0B',
  },
  coral: {
    text: 'text-[#FCA5A5]',
    border: 'border-[#EF4444]/30',
    bg: 'bg-[#EF4444]/12',
    glow: 'from-[#EF4444]/22',
    dot: '#EF4444',
  },
}

export const spotlightStores = [
  'iHerb',
  'Temu',
  'SHEIN',
  'AliExpress',
  'Namshi',
  'Farfetch',
  'Noon',
  'Sephora',
  'Booking.com',
  'talabat',
  'IKEA',
  'Careem',
  'adidas',
  'Samsung',
  'Airbnb',
  'Ounass',
  'Amazon AE',
  'Mumzworld',
]
