import { CheckCircle2, ClipboardPaste, Search, ShieldCheck } from 'lucide-react'
import { useLang, pick } from '../lib/lang'
import { copy } from '../lib/copy'

const icons = [Search, ClipboardPaste, ShieldCheck]

export default function HowItWorks() {
  const { lang } = useLang()

  return (
    <section id="how" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015] py-16 sm:py-20">
      <div className="shell">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="pill mx-auto mb-3 !border-azure/25 !bg-azure/10 !text-[#A5E3FF]">
            {pick(copy.how.eyebrow, lang)}
          </div>
          <h2 className="font-display text-[clamp(1.7rem,4vw,2.5rem)] font-bold leading-tight tracking-tight">
            {pick(copy.how.title, lang)}
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {copy.how.steps.map((step, i) => {
            const Icon = icons[i] ?? Search
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#1F1F1F] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-grape/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-grape/25 bg-grape/12 text-[#C4B0FF]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-[42px] font-bold leading-none text-white/[0.07]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[17px] font-semibold text-white">
                  {pick(step.title, lang)}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ash">{pick(step.body, lang)}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-grape/20 bg-gradient-to-br from-grape/[0.14] via-[#1F1F1F] to-azure/[0.08] p-6 sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr] sm:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-mint/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-mint">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {pick(copy.how.guaranteeTitle, lang)}
              </div>
              <p className="max-w-xl text-balance text-[15px] leading-relaxed text-white/80">
                {pick(copy.how.guaranteeBody, lang)}
              </p>
            </div>
            <ul className="space-y-2.5">
              {copy.how.guaranteePoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-black/25 px-3.5 py-2.5 text-[12.5px] font-medium text-white/80"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  {pick(point, lang)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
