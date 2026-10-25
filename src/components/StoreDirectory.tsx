import { ArrowUpRight, Store } from 'lucide-react'
import { accentStyles, deals, spotlightStores } from '../data/deals'
import { useLang, pick } from '../lib/lang'
import { copy } from '../lib/copy'

export default function StoreDirectory({ onPick }: { onPick: (store: string) => void }) {
  const { lang } = useLang()

  const counts = deals.reduce<Record<string, number>>((acc, deal) => {
    acc[deal.store] = (acc[deal.store] ?? 0) + 1
    return acc
  }, {})

  return (
    <section id="stores" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015] py-16 sm:py-20">
      <div className="shell">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="pill mx-auto mb-3 !border-grape/25 !bg-grape/10 !text-[#D5C9FF]">
            <Store className="h-3 w-3" aria-hidden="true" />
            {pick(copy.stores.eyebrow, lang)}
          </div>
          <h2 className="font-display text-[clamp(1.7rem,4vw,2.5rem)] font-bold leading-tight tracking-tight">
            {pick(copy.stores.title, lang)}
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ash">{pick(copy.stores.body, lang)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {spotlightStores.slice(0, 18).map((store, i) => {
            const deal = deals.find((d) => d.store === store)
            const accent = deal ? accentStyles[deal.accent] : accentStyles.grape
            const count = counts[store] ?? 1
            return (
              <button
                key={store}
                type="button"
                onClick={() => onPick(store)}
                className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-white/[0.08] bg-[#202020] p-4 text-start transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lift"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div
                  className={`absolute inset-x-0 -top-8 h-16 bg-gradient-to-b ${accent.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden="true"
                />
                <div className="mb-3 flex w-full items-start justify-between">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl border ${accent.border} ${accent.bg} font-display text-[11px] font-bold ${accent.text}`}
                  >
                    {deal?.monogram ?? store.slice(0, 2).toUpperCase()}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-white/70"
                    aria-hidden="true"
                  />
                </div>
                <p className="w-full truncate text-[13px] font-semibold text-white">{store}</p>
                <p className="mt-0.5 text-[11px] text-white/40">
                  {count} {pick(copy.stores.deals, lang)}
                </p>
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => onPick('')}
            className="btn-ghost !py-2.5 !text-[13px]"
          >
            {pick(copy.stores.viewAll, lang)}
            <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
