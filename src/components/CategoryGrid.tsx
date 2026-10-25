import { ArrowRight } from 'lucide-react'
import { categories, deals } from '../data/deals'
import { useLang, pick } from '../lib/lang'
import { copy } from '../lib/copy'

const tileGlow: Record<string, string> = {
  fashion: 'from-[#F472B6]/18',
  beauty: 'from-[#9E7FFF]/18',
  tech: 'from-[#38BDF8]/18',
  travel: 'from-[#10B981]/18',
  food: 'from-[#EF4444]/18',
  home: 'from-[#F59E0B]/18',
}

export default function CategoryGrid({ onSelect }: { onSelect: (key: string) => void }) {
  const { lang } = useLang()

  return (
    <section id="categories" className="scroll-mt-24 py-16 sm:py-20">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <div className="pill mb-3 !border-blush/25 !bg-blush/10 !text-[#F9A8D4]">
              {pick(copy.categories.eyebrow, lang)}
            </div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,2.5rem)] font-bold leading-tight tracking-tight">
              {pick(copy.categories.title, lang)}
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ash">
              {pick(copy.categories.body, lang)}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const items = deals.filter((d) => d.category === cat.key)
            const best = items.slice().sort((a, b) => b.uses - a.uses)[0]
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => onSelect(cat.key)}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#1F1F1F] p-6 text-start transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-lift"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${tileGlow[cat.key]} to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="font-display text-[19px] font-semibold text-white">
                      {pick(cat.label, lang)}
                    </p>
                    <p className="mt-1 text-[12px] text-white/40">
                      {items.length} {pick(copy.stores.deals, lang)}
                    </p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white group-hover:text-night">
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                  </span>
                </div>

                <div className="relative mt-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10.5px] font-medium uppercase tracking-wider text-white/35">
                      {lang === 'en' ? 'Top deal' : 'أفضل عرض'}
                    </p>
                    <p className="mt-0.5 text-[13px] font-medium text-white/80">{best?.store}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-display text-[11.5px] font-bold text-mint">
                    {best ? pick(best.discount, lang) : '—'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
