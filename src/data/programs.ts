/**
 * Affiliate programme map.
 *
 * Every store links out through one of these networks. The network decides the
 * final URL shape; the IDs come from your publisher account (see .env.example).
 * `target` is the clean destination we deep-link the shopper to.
 *
 * Until you add real IDs the builder falls back to plain UTM tagging on the
 * merchant URL — the link still works and attribution still records in your own
 * analytics, it just doesn't pay a commission yet.
 */

export type NetworkKey = 'admitad' | 'awin' | 'cj' | 'impact' | 'direct'

export type Programme = {
  store: string
  target: string
  network: NetworkKey
  /** Merchant ID inside the network (awinmid / campaign id / advertiser id). */
  merchantId: string
  /** Landing page the network deep-links into, e.g. the merchant's sale page. */
  deepLink?: string
}

export const programmes: Record<string, Programme> = {
  iHerb: { store: 'iHerb', target: 'https://www.iherb.com', network: 'awin', merchantId: '17777' },
  Temu: { store: 'Temu', target: 'https://www.temu.com', network: 'admitad', merchantId: 'temu-jo' },
  SHEIN: { store: 'SHEIN', target: 'https://ar.shein.com', network: 'admitad', merchantId: 'shein-menasa' },
  AliExpress: {
    store: 'AliExpress',
    target: 'https://www.aliexpress.com',
    network: 'admitad',
    merchantId: 'aliexpress',
  },
  Namshi: { store: 'Namshi', target: 'https://www.namshi.com', network: 'awin', merchantId: 'namshi-ae' },
  Farfetch: {
    store: 'Farfetch',
    target: 'https://www.farfetch.com',
    network: 'cj',
    merchantId: 'farfetch',
  },
  'Amazon AE': {
    store: 'Amazon AE',
    target: 'https://www.amazon.ae',
    network: 'direct',
    merchantId: 'amazon-ae',
  },
  Sephora: { store: 'Sephora', target: 'https://www.sephora.ae', network: 'awin', merchantId: 'sephora-me' },
  Noon: { store: 'Noon', target: 'https://www.noon.com', network: 'admitad', merchantId: 'noon' },
  'Booking.com': {
    store: 'Booking.com',
    target: 'https://www.booking.com',
    network: 'cj',
    merchantId: 'booking',
  },
  Careem: { store: 'Careem', target: 'https://www.careem.com', network: 'admitad', merchantId: 'careem' },
  talabat: { store: 'talabat', target: 'https://www.talabat.com', network: 'admitad', merchantId: 'talabat-jo' },
  IKEA: { store: 'IKEA', target: 'https://www.ikea.com', network: 'awin', merchantId: 'ikea-me' },
  Samsung: { store: 'Samsung', target: 'https://www.samsung.com', network: 'cj', merchantId: 'samsung-me' },
  Mumzworld: {
    store: 'Mumzworld',
    target: 'https://www.mumzworld.com',
    network: 'admitad',
    merchantId: 'mumzworld',
  },
  adidas: { store: 'adidas', target: 'https://www.adidas.com', network: 'awin', merchantId: 'adidas-me' },
  Airbnb: { store: 'Airbnb', target: 'https://www.airbnb.com', network: 'direct', merchantId: 'airbnb' },
  Ounass: { store: 'Ounass', target: 'https://www.ounass.ae', network: 'awin', merchantId: 'ounass' },
}

export const getProgramme = (store: string): Programme =>
  programmes[store] ?? {
    store,
    target: 'https://www.google.com/search?q=' + encodeURIComponent(store + ' Jordan'),
    network: 'direct',
    merchantId: store.toLowerCase().replace(/\s+/g, '-'),
  }
