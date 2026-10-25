import { BadgeCheck, Clock3, ShieldCheck, Sparkles } from 'lucide-react'
import { useLang, pick } from '../lib/lang'
import { copy } from '../lib/copy'

const icons = [BadgeCheck, Clock3, ShieldCheck, Sparkles]

export default function LiveTicker() {
  const { lang } = useLang()
  const items = copy.ticker

  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.02]">
      <div className="ticker-mask flex">
        <div className="flex shrink-0 animate-marquee items-center gap-8 py-3 pe-8">
          {[...items, ...items].map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <span
                key={i}
                className="inline-flex shrink-0 items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/45"
              >
                <Icon className="h-3.5 w-3.5 text-grape/70" aria-hidden="true" />
                {pick(item, lang)}
                <span className="ms-6 h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
              </span>
            )
          })}
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-8 py-3 pe-8" aria-hidden="true">
          {[...items, ...items].map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <span
                key={i}
                className="inline-flex shrink-0 items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/45"
              >
                <Icon className="h-3.5 w-3.5 text-grape/70" />
                {pick(item, lang)}
                <span className="ms-6 h-1 w-1 rounded-full bg-white/20" />
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
