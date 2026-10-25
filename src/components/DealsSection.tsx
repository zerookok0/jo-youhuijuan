import { useMemo, useState } from 'react'
import { ArrowDownUp, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { categories, type CategoryKey } from '../data/deals'
import { useLang, pick } from '../lib/lang'
import { copy } from '../lib/copy'
import { useDeals } from '../lib/useDeals'
import DealCard from './DealCard'
import SourceBadge from './SourceBadge'

type SortKey = 'newest' | 'popular' | 'expiring' | 'biggest'
type TypeKey = 'all' | 'code' | 'deal'

const savingsOf = (text: string) => {
  const pct = text.match(/(\d+)\s*%/g)
  if (pct) return Math.max(...pct.map((p) => parseInt(p, 10))) * 1
  const amount = text.match(/(\d+)/)
  return amount ? parseFloat(amount[1]) : 0
}

export default function DealsSection({
  query,
  setQuery,
  category,
  setCategory,
}: {
  query: string
  setQuery: (v: string) => void
  category: CategoryKey | 'all'
  setCategory: (v: CategoryKey | 'all') => void
}) {
  const { lang } = useLang()
  const { deals, isDemo, loading, error, updatedAt, refresh } = useDeals()
  const [sort, setSort] = useState<SortKey>('newest')
  const [type, setType] = useState<TypeKey>('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = deals.filter((deal) => {
      const matchesQuery =
        !q ||
        deal.store.toLowerCase().includes(q) ||
        deal.title.en.toLowerCase().includes(q) ||
        deal.title.ar.includes(q) ||
        deal.discount.en.toLowerCase().includes(q) ||
        deal.category.includes(q)
      const matchesCategory = category === 'all' || deal.category === category
      const matchesType = type === 'all' || deal.type === type
      return matchesQuery && matchesCategory && matchesType
    })

    list = [...list].sort((a, b) => {
      if (sort === 'popular') return b.uses - a.uses
      if (sort === 'expiring') return a.expiresInDays - b.expiresInDays
      if (sort === 'biggest') return savingsOf(b.discount.en) - savingsOf(a.discount.en)
      return a.verifiedHoursAgo - b.verifiedHoursAgo
    })

    return list
  }, [deals, query, category, sort, type])

  const visible = showAll ? filtered : filtered.slice(0, 9)
  const hasFilters = query.trim() !== '' || category !== 'all' || type !== 'all'

  const clearAll = () => {
    setQuery('')
    setCategory('all')
    setType('all')
    setSort('newest')
  }

  return (
    <section id="deals" className="scroll-mt-24 py-16 sm:py-20">
      <div className="shell">
        <div className="flex flex-col gap-5 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="pill mb-3 !border-azure/25 !bg-azure/10 !text-[#A5E3FF]">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {pick(copy.featured.eyebrow, lang)}
            </div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
              {pick(copy.featured.title, lang)}
            </h2>
            <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ash">
              {pick(copy.featured.body, lang)}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-2 self-start sm:items-end sm:self-auto">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] font-semibold text-white/70">
              {filtered.length} {pick(copy.filters.results, lang)}
            </span>
            <SourceBadge
              isDemo={isDemo}
              loading={loading}
              error={error}
              updatedAt={updatedAt}
              onRefresh={refresh}
              lang={lang}
            />
          </div>
        </div>

        {/* toolbar */}
        <div className="sticky top-[72px] z-40 -mx-5 mt-5 border-b border-white/[0.06] bg-night/85 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="group relative flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 transition-colors focus-within:border-grape/50">
                <Search className="h-4 w-4 shrink-0 text-white/35" aria-hidden="true" />
                <span className="sr-only">{pick(copy.filters.searchLabel, lang)}</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={pick(copy.filters.searchPlaceholder, lang)}
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-[13.5px] text-white placeholder:text-white/30 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20"
                    aria-label="Clear search"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                )}
              </label>

              <div className="flex items-center gap-2">
                <div className="relative flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2 text-[12.5px]">
                  <ArrowDownUp className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
                  <label className="sr-only" htmlFor="sort">
                    {pick(copy.filters.sort, lang)}
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="cursor-pointer appearance-none bg-transparent pe-4 font-medium text-white/80 focus:outline-none"
                  >
                    <option value="newest" className="bg-[#1D1D1D]">{pick(copy.filters.sortNewest, lang)}</option>
                    <option value="popular" className="bg-[#1D1D1D]">{pick(copy.filters.sortPopular, lang)}</option>
                    <option value="expiring" className="bg-[#1D1D1D]">{pick(copy.filters.sortExpiring, lang)}</option>
                    <option value="biggest" className="bg-[#1D1D1D]">{pick(copy.filters.sortBiggest, lang)}</option>
                  </select>
                </div>

                <div className="relative flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2 text-[12.5px]">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
                  <label className="sr-only" htmlFor="type">
                    {pick(copy.filters.typeAll, lang)}
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as TypeKey)}
                    className="cursor-pointer appearance-none bg-transparent pe-2 font-medium text-white/80 focus:outline-none"
                  >
                    <option value="all" className="bg-[#1D1D1D]">{pick(copy.filters.typeAll, lang)}</option>
                    <option value="code" className="bg-[#1D1D1D]">{pick(copy.filters.typeCode, lang)}</option>
                    <option value="deal" className="bg-[#1D1D1D]">{pick(copy.filters.typeDeal, lang)}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* category chips */}
            <div className="-mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-0.5 no-scrollbar">
              <button
                type="button"
                onClick={() => setCategory('all')}
                aria-pressed={category === 'all'}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                  category === 'all'
                    ? 'border-transparent bg-white text-night'
                    : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white'
                }`}
              >
                {pick(copy.filters.all, lang)}
              </button>
              {categories.map((cat) => {
                const isActive = category === cat.key
                const count = deals.filter((d) => d.category === cat.key).length
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setCategory(cat.key)}
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                      isActive
                        ? 'border-transparent bg-white text-night'
                        : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {pick(cat.label, lang)}
                    <span className={`ms-1.5 text-[10.5px] ${isActive ? 'text-night/50' : 'text-white/30'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="ms-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-coral/30 bg-coral/10 px-3 py-1.5 text-[12px] font-medium text-[#FCA5A5] transition-colors hover:bg-coral/20"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                  {pick(copy.filters.clear, lang)}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* grid */}
        {filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/12 bg-white/[0.02] px-6 py-20 text-center">
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Search className="h-6 w-6 text-white/30" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white">
              {pick(copy.filters.emptyTitle, lang)}
            </h3>
            <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-ash">
              {pick(copy.filters.emptyBody, lang)}
            </p>
            <button type="button" onClick={clearAll} className="btn-ghost mt-6 !py-2.5 !text-[13px]">
              {pick(copy.filters.clear, lang)}
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((deal, i) => (
                <DealCard key={deal.id} deal={deal} index={i} />
              ))}
            </div>

            {filtered.length > 9 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  className="btn-ghost"
                  aria-expanded={showAll}
                >
                  {showAll
                    ? lang === 'en'
                      ? 'Show fewer deals'
                      : 'عرض عروض أقل'
                    : lang === 'en'
                      ? `Show all ${filtered.length} deals`
                      : `عرض كل ${filtered.length} عرضاً`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
