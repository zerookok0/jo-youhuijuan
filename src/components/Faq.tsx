import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useLang, pick } from '../lib/lang'
import { copy } from '../lib/copy'

export default function Faq() {
  const { lang } = useLang()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 pb-16 sm:pb-20">
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="pill mb-3 !border-sun/25 !bg-sun/10 !text-[#FCD34D]">
            {pick(copy.faq.eyebrow, lang)}
          </div>
          <h2 className="font-display text-[clamp(1.7rem,4vw,2.4rem)] font-bold leading-tight tracking-tight">
            {pick(copy.faq.title, lang)}
          </h2>
          <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-ash">
            {pick(copy.faq.body, lang)}
          </p>
          <a
            href="mailto:hello@waffar.jo"
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-white underline decoration-grape/50 decoration-2 underline-offset-4 transition-colors hover:text-grape"
          >
            hello@waffar.jo
          </a>
        </div>

        <div className="divide-y divide-white/[0.07] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#1F1F1F]">
          {copy.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="text-[14.5px] font-medium text-white">
                      {pick(item.q, lang)}
                    </span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'border-transparent bg-white text-night'
                          : 'border-white/12 bg-white/[0.04] text-white/60'
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pe-12 text-[13.5px] leading-relaxed text-ash">
                      {pick(item.a, lang)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
