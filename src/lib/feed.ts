import {
  seedDeals,
  normalise,
  type Accent,
  type CategoryKey,
  type Deal,
} from '../data/deals'
import { getProgramme } from '../data/programs'

/**
 * Live coupon feed.
 *
 * Point VITE_DEALS_FEED_URL at a JSON endpoint you control (a serverless
 * function that proxies Admitad / Awin / CJ and normalises their payloads).
 * Keeping the normalisation server-side means your network credentials never
 * reach the browser and you can swap networks without a redeploy of the UI.
 *
 * Expected response: { updatedAt: string, deals: FeedRow[] }
 * A FeedRow is deliberately close to Deal but forgiving — we coerce accents,
 * categories and timestamps rather than trusting the source.
 */

export type FeedRow = {
  id: string
  store: string
  title: string
  titleAr?: string
  discount: string
  discountAr?: string
  code?: string | null
  terms?: string
  termsAr?: string
  category?: string
  badge?: string
  badgeAr?: string
  uses?: number
  lastCheckedAt?: string
  expiresAt?: string
  url?: string
  featured?: boolean
  hot?: boolean
}

type FeedPayload = { updatedAt?: string; deals?: FeedRow[] }

const ACCENTS: Accent[] = ['grape', 'azure', 'blush', 'mint', 'sun', 'coral']
const CATEGORIES: CategoryKey[] = ['fashion', 'beauty', 'tech', 'travel', 'food', 'home']

const pickAccent = (seed: string): Accent => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 997
  return ACCENTS[hash % ACCENTS.length]
}

const pickCategory = (raw: string | undefined, store: string): CategoryKey => {
  const value = (raw ?? '').toLowerCase()
  const match = CATEGORIES.find((c) => value.includes(c))
  if (match) return match
  return pickAccent(store) === 'blush' ? 'beauty' : 'fashion'
}

const monogramFor = (store: string) => {
  const cleaned = store.replace(/[^\p{L}\p{N} ]/gu, '').trim()
  const words = cleaned.split(/\s+/)
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase()
  return cleaned.slice(0, 2)
}

/** Turns one feed row into a Deal, or null if it is unusable. */
export function adaptFeedRow(row: FeedRow): Deal | null {
  if (!row?.id || !row?.store || !row?.title || !row?.discount) return null

  const programme = getProgramme(row.store)

  return normalise({
    id: row.id,
    store: row.store,
    monogram: monogramFor(row.store),
    category: pickCategory(row.category, row.store),
    accent: pickAccent(row.store),
    discount: { en: row.discount, ar: row.discountAr ?? row.discount },
    badge: {
      en: row.badge ?? 'Live deal',
      ar: row.badgeAr ?? row.badge ?? 'عرض متاح',
    },
    title: { en: row.title, ar: row.titleAr ?? row.title },
    terms: {
      en: row.terms ?? 'See the store page for full conditions.',
      ar: row.termsAr ?? row.terms ?? 'راجع صفحة المتجر للشروط الكاملة.',
    },
    code: row.code ?? null,
    type: row.code ? 'code' : 'deal',
    uses: row.uses ?? 0,
    verifiedHoursAgo: 0,
    expiresInDays: 14,
    featured: row.featured,
    hot: row.hot,
    storeUrl: row.url ?? programme.target,
    lastCheckedAt: row.lastCheckedAt,
    expiresAt: row.expiresAt,
    source: 'feed',
  })
}

export type FeedResult = {
  deals: Deal[]
  updatedAt: string | null
  live: boolean
  error: string | null
}

export const feedUrl = (): string => {
  const value = (import.meta.env as Record<string, string | undefined>).VITE_DEALS_FEED_URL
  return typeof value === 'string' ? value : ''
}

export async function fetchLiveDeals(signal?: AbortSignal): Promise<FeedResult> {
  const url = feedUrl()
  if (!url) {
    return { deals: seedDeals, updatedAt: null, live: false, error: null }
  }

  try {
    const res = await fetch(url, { signal, headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`Feed responded ${res.status}`)

    const payload = (await res.json()) as FeedPayload
    const rows = Array.isArray(payload.deals) ? payload.deals : []
    const adapted = rows
      .map(adaptFeedRow)
      .filter((d): d is Deal => Boolean(d))

    if (adapted.length === 0) throw new Error('Feed returned no usable deals')

    return { deals: adapted, updatedAt: payload.updatedAt ?? null, live: true, error: null }
  } catch (error) {
    if (signal?.aborted) return { deals: seedDeals, updatedAt: null, live: false, error: null }
    return {
      deals: seedDeals,
      updatedAt: null,
      live: false,
      error: error instanceof Error ? error.message : 'Feed unavailable',
    }
  }
}
