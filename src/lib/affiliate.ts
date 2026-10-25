import { getProgramme, type NetworkKey, type Programme } from '../data/programs'

/**
 * Builds the outbound URL for a store.
 *
 * The visitor gets a stable id (stored locally) so the network can attribute
 * *this* click to *this* article. That is what turns a working link into a paid
 * one — a bare merchant URL never earns anything.
 */

const VISITOR_KEY = 'waffar.visitor'

export function getVisitorId(): string {
  if (typeof window === 'undefined') return 'srv'
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY)
    if (existing) return existing
    const fresh =
      'w' +
      Math.random().toString(36).slice(2, 10) +
      Date.now().toString(36).slice(-4)
    window.localStorage.setItem(VISITOR_KEY, fresh)
    return fresh
  } catch {
    return 'anon'
  }
}

const env = (key: string, fallback = ''): string => {
  const value = (import.meta.env as Record<string, string | undefined>)[key]
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

export type AffiliateConfig = {
  admitadPublisher: string
  awinPublisher: string
  cjWebsiteId: string
  impactAccount: string
  siteTag: string
}

export function getAffiliateConfig(): AffiliateConfig {
  return {
    admitadPublisher: env('VITE_ADMITAD_PUBLISHER_ID'),
    awinPublisher: env('VITE_AWIN_PUBLISHER_ID'),
    cjWebsiteId: env('VITE_CJ_WEBSITE_ID'),
    impactAccount: env('VITE_IMPACT_ACCOUNT_SID'),
    siteTag: env('VITE_SITE_TAG', 'waffar'),
  }
}

const withUtm = (target: string, dealId: string, siteTag: string) => {
  const url = new URL(target)
  url.searchParams.set('utm_source', siteTag)
  url.searchParams.set('utm_medium', 'affiliate')
  url.searchParams.set('utm_campaign', dealId)
  return url.toString()
}

/** True when at least one network has credentials, i.e. clicks can earn. */
export function isMonetised(config = getAffiliateConfig()): boolean {
  return Boolean(config.admitadPublisher || config.awinPublisher || config.cjWebsiteId)
}

function buildNetworkUrl(
  programme: Programme,
  config: AffiliateConfig,
  subId: string,
  target: string,
): { url: string; network: NetworkKey; monetised: boolean } {
  const destination = programme.deepLink ?? programme.target

  switch (programme.network) {
    case 'admitad': {
      if (!config.admitadPublisher) break
      const url = new URL(
        `https://ad.admitad.com/g/${config.admitadPublisher}/${programme.merchantId}/`,
      )
      url.searchParams.set('ulp', destination)
      url.searchParams.set('subid', subId)
      return { url: url.toString(), network: 'admitad', monetised: true }
    }
    case 'awin': {
      if (!config.awinPublisher) break
      const url = new URL('https://www.awin1.com/cread.php')
      url.searchParams.set('awinmid', programme.merchantId)
      url.searchParams.set('awinaffid', config.awinPublisher)
      url.searchParams.set('clickref', subId)
      url.searchParams.set('ued', destination)
      return { url: url.toString(), network: 'awin', monetised: true }
    }
    case 'cj': {
      if (!config.cjWebsiteId) break
      const url = new URL('https://www.anrdoezrs.net/links/redirect')
      url.searchParams.set('siteId', config.cjWebsiteId)
      url.searchParams.set('advertiserId', programme.merchantId)
      url.searchParams.set('sid', subId)
      url.searchParams.set('url', destination)
      return { url: url.toString(), network: 'cj', monetised: true }
    }
    case 'impact': {
      if (!config.impactAccount) break
      const url = new URL(
        `https://${config.impactAccount}.pxf.io/c/${programme.merchantId}/${subId}`,
      )
      url.searchParams.set('u', destination)
      return { url: url.toString(), network: 'impact', monetised: true }
    }
    case 'direct':
    default:
      break
  }

  return { url: target, network: 'direct', monetised: false }
}

export type OutboundLink = {
  href: string
  network: NetworkKey
  /** False means this click is tracked by us but earns no commission yet. */
  monetised: boolean
  store: string
}

export function buildOutboundLink(store: string, dealId: string, overrideTarget?: string): OutboundLink {
  const config = getAffiliateConfig()
  const programme = getProgramme(store)
  const target = overrideTarget ?? programme.target
  const subId = `${config.siteTag}-${dealId}`
  const fallbackTarget = withUtm(target, dealId, config.siteTag)

  const built = buildNetworkUrl(programme, config, subId, target)

  return {
    href: built.monetised ? built.url : fallbackTarget,
    network: built.network,
    monetised: built.monetised,
    store,
  }
}

/** Human label for the disclosure line under a deal. */
export function disclosureLabel(link: OutboundLink, lang: 'en' | 'ar'): string {
  if (lang === 'ar') {
    return link.monetised
      ? `رابط عمولة عبر ${link.network.toUpperCase()}`
      : 'رابط تابع — بدون عمولة بعد'
  }
  return link.monetised
    ? `Affiliate link via ${link.network.toUpperCase()}`
    : 'Tracked link — commission not active yet'
}
