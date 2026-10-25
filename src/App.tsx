import { useCallback, useEffect, useMemo, useState } from 'react'
import { Quote, Star } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import DealsSection from './components/DealsSection'
import StoreDirectory from './components/StoreDirectory'
import CategoryGrid from './components/CategoryGrid'
import HowItWorks from './components/HowItWorks'
import Newsletter from './components/Newsletter'
import LiveTicker from './components/LiveTicker'
import Faq from './components/Faq'
import Footer from './components/Footer'
import DownloadPage from './pages/DownloadPage'
import { DealsProvider } from './lib/useDeals'
import { LangContext, useLang, pick } from './lib/lang'
import { copy } from './lib/copy'
import { categories, type CategoryKey, type Lang } from './data/deals'

function TrustBand() {
  const { lang } = useLang()
  return (
    <section className="py-14 sm:py-16">
      <div className="shell">
        <div className="grid gap-6 rounded-3xl border border-white/[0.08] bg-[#1D1D1D]/70 p-6 backdrop-blur sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-3 flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#FCD34D] text-[#FCD34D]" />
              ))}
              <span className="ms-2 text-[12px] font-semibold text-white/60">4.8 / 5</span>
            </div>
            <h2 className="font-display text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-snug tracking-tight text-white">
              {pick(copy.trust.title, lang)}
            </h2>
            <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-ash">
              {pick(copy.trust.body, lang)}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                quote: {
                  en: 'Saved 18 JOD on a SHEIN order with two codes from here. The expiry dates were accurate.',
                  ar: 'وفّرت 18 ديناراً على طلب شي إن بكودين من هنا. تواريخ الانتهاء كانت دقيقة.',
                },
                name: { en: 'Layla M.', ar: 'ليلى م.' },
                city: { en: 'Amman', ar: 'عمّان' },
              },
              {
                quote: {
                  en: 'The iHerb code worked first try. This is the only coupon site I trust for supplements.',
                  ar: 'كود آي هيرب عمل من المحاولة الأولى. هذا الموقع الوحيد الموثوق للمكملات.',
                },
                name: { en: 'Omar K.', ar: 'عمر ك.' },
                city: { en: 'Irbid', ar: 'إربد' },
              },
            ].map((item, i) => (
              <figure key={i} className="rounded-2xl border border-white/[0.07] bg-black/25 p-4">
                <Quote className="mb-2 h-4 w-4 text-grape/60" aria-hidden="true" />
                <blockquote className="text-[12.5px] leading-relaxed text-white/75">
                  “{pick(item.quote, lang)}”
                </blockquote>
                <figcaption className="mt-3 flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-[9px] font-bold text-white">
                    {pick(item.name, lang).slice(0, 1)}
                  </span>
                  <span className="text-[11px] text-white/50">
                    {pick(item.name, lang)} · {pick(item.city, lang)}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [lang, setLangState] = useState<Lang>('en')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryKey | 'all'>('all')
  const [route, setRoute] = useState<string>(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  )

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path)
    setRoute(path)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem('waffar.lang', next)
    } catch {
      /* storage unavailable */
    }
  }, [])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('waffar.lang')
      if (saved === 'ar' || saved === 'en') setLangState(saved)
    } catch {
      /* storage unavailable */
    }
  }, [])

  const ctx = useMemo(() => ({ lang, setLang, dir: dir as 'ltr' | 'rtl' }), [lang, setLang, dir])

  const focusDeals = useCallback((value: string) => {
    setQuery(value)
    window.setTimeout(() => {
      document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }, [])

  return (
    <LangContext.Provider value={ctx}>
      <DealsProvider>
        <div className="min-h-screen">
          {route === '/download' ? (
            <main>
              <DownloadPage onBack={() => navigate('/')} />
            </main>
          ) : (
            <>
              <Header onDownload={() => navigate('/download')} />
              <main>
                <Hero onSearch={focusDeals} />
                <LiveTicker />
                <DealsSection
                  query={query}
                  setQuery={setQuery}
                  category={category}
                  setCategory={setCategory}
                />
                <StoreDirectory onPick={focusDeals} />
                <CategoryGrid
                  onSelect={(key) => {
                    setQuery('')
                    setCategory(categories.some((c) => c.key === key) ? (key as CategoryKey) : 'all')
                    window.setTimeout(() => {
                      document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }, 60)
                  }}
                />
                <HowItWorks />
                <TrustBand />
                <Newsletter />
                <Faq />
              </main>
              <Footer onDownload={() => navigate('/download')} />
            </>
          )}
        </div>
      </DealsProvider>
    </LangContext.Provider>
  )
}
