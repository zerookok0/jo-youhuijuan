/*
 * Minimal offline shell for Waffar.
 *
 * Strategy: cache-first for the app shell so an installed copy opens instantly
 * with no signal, stale-while-revalidate for everything else. Coupon data comes
 * from the deal feed and is deliberately NOT cached here — a stale code is worse
 * than a missing one, so we let that request fail and the UI falls back to the
 * last rows held in React state.
 */

const SHELL = 'waffar-shell-v1'
const SHELL_ASSETS = ['/', '/index.html', '/manifest.webmanifest']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== SHELL).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Never serve stale coupon JSON.
  if (url.pathname.startsWith('/api') || url.searchParams.has('feed')) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html').then((hit) => hit ?? Response.error())),
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(SHELL).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(() => cached ?? Response.error())
      return cached ?? network
    }),
  )
})
