import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, BadgeCheck, Check, Copy, Search, ShieldCheck, Sparkles, Ticket } from 'lucide-react'
import { useLang, pick } from '../lib/lang'
import { copy } from '../lib/copy'
import { accentStyles, deals } from '../data/deals'
import { useClipboard } from '../lib/useClipboard'

type Props = {
  onSearch: (value: string) => void
}

const rotating = [
  { store: 'iHerb', code: 'WAFF25', accent: 'mint' as const, value: '25%' },
  { store: 'Temu', code: 'WAFF30', accent: 'coral' as const, value: '30%' },
  { store: 'Namshi', code: 'NAM15WA', accent: 'grape' as const, value: '15%' },
]

export default function Hero({ onSearch }: Props) {
  const { lang } = useLang()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { copied, copy: copyCode } = useClipboard()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % rotating.length)
      setRevealed(false)
    }, 3800)
    return () => window.clearInterval(id)
  }, [])

  const current = rotating[active]
  const accent = accentStyles[current.accent]

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return deals
      .filter((d) => d.store.toLowerCase().includes(q) || d.category.includes(q))
      .slice(0, 4)
  }, [query])

  const openSuggestions = showSuggestions && suggestions.length > 0

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setShowSuggestions(false)
    onSearch(query)
    document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleReveal = async () => {
    setRevealed(true)
    await copyCode(current.code, current.code)
  }

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-[104px] sm:pb-24 sm:pt-[132px]">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-fade bg-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_at_50%_0%,#000_10%,transparent_72%)]" />
        <div className="absolute left-1/2 top-[-18%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-grape/20 blur-[150px]" />
        <div className="absolute end-[-10%] top-[18%] h-[380px] w-[380px] rounded-full bg-azure/14 blur-[120px]" />
        <div className="absolute start-[-8%] top-[42%] h-[320px] w-[320px] rounded-full bg-blush/12 blur-[130px]" />
      </div>

      <div className="shell grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        {/* copy column */}
        <div className="animate-fadeUp">
          <div className="pill mb-6 !border-grape/25 !bg-grape/10 !text-[#D5C9FF]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            {pick(copy.hero.eyebrow, lang)}
            <span className="mx-1 h-3 w-px bg-white/20" aria-hidden="true" />
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {copy.hero.liveNow[lang]}
          </div>

          <h1 className="font-display text-[clamp(2.6rem,7vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-white">
            {pick(copy.hero.title1, lang)}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#C4B0FF] via-white to-[#7DD3FC] bg-clip-text text-transparent">
                {pick(copy.hero.title2, lang)}
              </span>
              <svg
                className="absolute -bottom-2 left-0 z-0 w-full text-grape/50"
                viewBox="0 0 300 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 10C60 3 120 2 180 6c40 2.6 80 5 117 2"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            {pick(copy.hero.title3, lang)}
          </h1>

          <p className="mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-ash">
            {pick(copy.hero.body, lang)}
          </p>

          {/* search */}
          <form onSubmit={submit} className="relative mt-8 max-w-[560px]">
            <div className="group relative flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.05] p-1.5 shadow-lift backdrop-blur-xl transition-colors focus-within:border-grape/50">
              <Search className="ms-3 h-[18px] w-[18px] shrink-0 text-white/40" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={pick(copy.hero.searchPlaceholder, lang)}
                className="min-w-0 flex-1 bg-transparent py-2.5 text-[14.5px] text-white placeholder:text-white/35 focus:outline-none"
                aria-label={pick(copy.hero.searchPlaceholder, lang)}
                autoComplete="off"
              />
              <button type="submit" className="btn-primary shrink-0 !px-4 !py-2.5 !text-[13px]">
                {copy.hero.searchCta[lang]}
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
              </button>
            </div>

            {openSuggestions && (
              <ul className="absolute inset-x-0 top-[calc(100%+8px)] z-30 animate-pop overflow-hidden rounded-2xl border border-white/10 bg-[#1D1D1D]/95 p-1.5 shadow-lift backdrop-blur-xl">
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(s.store)
                        setShowSuggestions(false)
                        onSearch(s.store)
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start transition-colors hover:bg-white/[0.07]"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-[10px] font-bold">
                          {s.monogram}
                        </span>
                        <span className="text-[13.5px] font-medium text-white">{s.store}</span>
                      </span>
                      <span className="text-[11.5px] font-semibold text-mint">{pick(s.discount, lang)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/45">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
              {pick(copy.card.verified, lang)} {pick(copy.card.hoursAgo, lang)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-azure" aria-hidden="true" />
              184 {pick(copy.stores.deals, lang)}
            </span>
            <a href="#deals" className="font-medium text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white">
              {pick(copy.hero.browseAll, lang)}
            </a>
          </div>

          {/* stats */}
          <dl className="mt-10 grid max-w-[560px] grid-cols-3 gap-3">
            {copy.hero.stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-3 backdrop-blur-sm"
              >
                <dt className="text-[10.5px] font-medium uppercase tracking-wider text-white/40">
                  {pick(stat.label, lang)}
                </dt>
                <dd className="mt-1 font-display text-lg font-bold text-white sm:text-xl">
                  {pick(stat.value, lang)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* visual column */}
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div className="relative animate-float [--tilt:-3deg]">
            <div
              className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-grape/25 via-transparent to-azure/20 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#1E1E1E]/95 shadow-lift backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-[#EF4444]/70" />
                  <span className="h-2 w-2 rounded-full bg-[#F59E0B]/70" />
                  <span className="h-2 w-2 rounded-full bg-[#10B981]/70" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint">
                  <Check className="h-2.5 w-2.5" aria-hidden="true" />
                  {pick(copy.card.verified, lang)}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-2xl border ${accent.border} ${accent.bg} font-display text-base font-bold ${accent.text} transition-colors duration-500`}
                    >
                      {current.store.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-display text-[17px] font-semibold text-white">{current.store}</p>
                      <p className="text-[11.5px] text-ash">
                        {pick(copy.filters.typeCode, lang)} · {pick(copy.card.verified, lang)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1.5 font-display text-sm font-bold ${accent.border} ${accent.bg} ${accent.text} transition-colors duration-500`}
                  >
                    {current.value}
                  </span>
                </div>

                <div className="my-5 flex items-center" aria-hidden="true">
                  <span className="notch -start-8" />
                  <div className="flex-1 border-t border-dashed border-white/15" />
                  <span className="notch -end-8" />
                </div>

                <p className="text-[12px] font-medium uppercase tracking-wider text-white/40">
                  {pick(copy.filters.typeCode, lang)}
                </p>

                <button
                  type="button"
                  onClick={handleReveal}
                  className={`mt-2 flex w-full items-center justify-between gap-3 rounded-2xl border border-dashed px-4 py-4 transition-all duration-300 ${
                    copied === current.code
                      ? 'border-mint/60 bg-mint/10'
                      : 'border-white/25 bg-black/40 hover:border-grape/50'
                  }`}
                >
                  <code
                    className={`font-mono text-xl font-bold tracking-[0.25em] transition-all duration-300 ${
                      revealed ? 'text-white' : 'text-white/35 blur-[3px]'
                    }`}
                  >
                    {revealed ? current.code : 'WAFF••'}
                  </code>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                      copied === current.code ? 'bg-mint text-night' : 'bg-white text-night'
                    }`}
                  >
                    {copied === current.code ? (
                      <>
                        <Check className="h-3 w-3" aria-hidden="true" />
                        {pick(copy.card.copied, lang)}
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" aria-hidden="true" />
                        {pick(copy.card.copy, lang)}
                      </>
                    )}
                  </span>
                </button>

                <div className="mt-4 flex items-center justify-between text-[11px] text-white/40">
                  <span className="inline-flex items-center gap-1.5">
                    <Ticket className="h-3 w-3" aria-hidden="true" />
                    {pick(copy.card.expires, lang)} 12 {pick(copy.card.days, lang)}
                  </span>
                  <span>12,480 {pick(copy.card.used, lang)}</span>
                </div>

                <div className="mt-4 flex gap-1.5" aria-hidden="true">
                  {rotating.map((r, i) => (
                    <span
                      key={r.store}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        i === active ? 'bg-grape' : 'bg-white/12'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* floating chips */}
          <div
            className="absolute -end-3 -top-4 animate-float rounded-2xl border border-white/10 bg-[#242424]/95 px-3.5 py-2.5 shadow-lift backdrop-blur [animation-delay:1.2s] sm:-end-6"
            aria-hidden="true"
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
              {pick(copy.hero.stats[2].label, lang)}
            </p>
            <p className="font-display text-base font-bold text-mint">JOD 186,240</p>
          </div>

          <div
            className="absolute -bottom-5 -start-2 animate-float rounded-2xl border border-white/10 bg-[#242424]/95 px-3.5 py-2.5 shadow-lift backdrop-blur [animation-delay:2.1s] sm:-start-6"
            aria-hidden="true"
          >
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
              <span className="h-1.5 w-1.5 animate-ticker rounded-full bg-mint" />
              96% {lang === 'en' ? 'success rate' : 'نسبة النجاح'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
