import { useCallback, useEffect, useState } from 'react'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export type InstallState = 'unsupported' | 'available' | 'installed' | 'ios-manual'

/**
 * Wraps the beforeinstallprompt flow plus a service-worker registration.
 * iOS never fires beforeinstallprompt, so we detect it and tell the user to use
 * Share → Add to Home Screen instead of showing a dead button.
 */
export function useInstallPrompt() {
  const [state, setState] = useState<InstallState>('unsupported')
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true

    if (standalone) {
      setState('installed')
      return
    }

    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent)

    const onPrompt = (event: Event) => {
      event.preventDefault()
      setDeferred(event as InstallPromptEvent)
      setState('available')
    }

    const onInstalled = () => {
      setState('installed')
      setDeferred(null)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)

    if (isIos) setState('ios-manual')

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return
    if (location.hostname === 'localhost' || location.protocol === 'https:') {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* offline shell is a bonus, never a blocker */
      })
    }
  }, [])

  const install = useCallback(async () => {
    if (!deferred) return 'ios-manual' as const
    await deferred.prompt()
    const choice = await deferred.userChoice
    if (choice.outcome === 'accepted') {
      setState('installed')
      setDeferred(null)
      return 'accepted' as const
    }
    return 'dismissed' as const
  }, [deferred])

  return { state, install }
}
