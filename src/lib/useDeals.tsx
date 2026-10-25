import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { seedDeals, type Deal } from '../data/deals'
import { fetchLiveDeals, feedUrl, type FeedResult } from '../lib/feed'

export type DealsContextValue = {
  deals: Deal[]
  /** True once rows came from your live affiliate feed rather than seed data. */
  live: boolean
  loading: boolean
  error: string | null
  updatedAt: string | null
  /** True when the page is running on demo rows — surfaced in the UI. */
  isDemo: boolean
  refresh: () => void
}

const DealsContext = createContext<DealsContextValue>({
  deals: seedDeals,
  live: false,
  loading: false,
  error: null,
  updatedAt: null,
  isDemo: true,
  refresh: () => undefined,
})

export function DealsProvider({ children }: { children: ReactNode }) {
  const configured = Boolean(feedUrl())
  const [state, setState] = useState<FeedResult>({
    deals: seedDeals,
    updatedAt: null,
    live: false,
    error: null,
  })
  const [loading, setLoading] = useState(configured)
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    if (!configured) {
      setLoading(false)
      return
    }

    const controller = new AbortController()
    setLoading(true)

    fetchLiveDeals(controller.signal)
      .then((result) => setState(result))
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [configured, nonce])

  const value = useMemo<DealsContextValue>(
    () => ({
      deals: state.deals,
      live: state.live,
      loading,
      error: state.error,
      updatedAt: state.updatedAt,
      isDemo: !state.live,
      refresh: () => setNonce((n) => n + 1),
    }),
    [state, loading],
  )

  return <DealsContext.Provider value={value}>{children}</DealsContext.Provider>
}

export const useDeals = () => useContext(DealsContext)
