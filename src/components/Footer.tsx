import { ArrowUpRight, Globe, Instagram, Mail, Smartphone, Twitter } from 'lucide-react'
import { useLang, pick } from '../lib/lang'
import { copy } from '../lib/copy'

export default function Footer({ onDownload }: { onDownload: () => void }) {
  const { lang, setLang } = useLang()

  const columns = [
    { title: copy.footer.explore, links: copy.footer.links.explore },
    { title: copy.footer.company, links: copy.footer.links.company },
    { title: copy.footer.legal, links: copy.footer.links.legal },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#141414]">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[720px] -translate-x-1/2 rounded-full bg-grape/12 blur-[120px]"
        aria-hidden="true"
      />
      <div className="shell relative py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[14px] bg-gradient-to-br from-[#C4B0FF] via-grape to-azure">
                <span className="absolute inset-[1.5px] rounded-[12px] bg-[#141414]" />
                <span className="relative font-display text-[15px] font-bold text-white">و</span>
              </span>
              <span className="font-display text-[18px] font-bold tracking-tight">
                {copy.brand}
                <span className="text-azure">.jo</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ash">
              {pick(copy.footer.tagline, lang)}
            </p>

            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'X' },
                { Icon: Mail, label: 'Email' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all hover:border-grape/40 hover:text-grape"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="ms-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] font-medium text-white/60 transition-all hover:border-white/25 hover:text-white"
              >
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                {copy.misc.langToggle[lang]}
              </button>
            </div>

            <button
              type="button"
              onClick={onDownload}
              className="mt-5 inline-flex w-full max-w-xs items-center justify-between gap-2 rounded-2xl border border-grape/25 bg-gradient-to-r from-grape/[0.16] to-azure/[0.10] px-4 py-3 text-start transition-all hover:border-grape/45"
            >
              <span className="flex items-center gap-2.5">
                <Smartphone className="h-4 w-4 text-[#D5C9FF]" aria-hidden="true" />
                <span>
                  <span className="block text-[12.5px] font-semibold text-white">
                    {lang === 'ar' ? 'حمّل تطبيق وفّر' : 'Get the Waffar app'}
                  </span>
                  <span className="mt-0.5 block text-[10.5px] text-white/40">
                    {lang === 'ar' ? 'أكواد تعمل بدون إنترنت' : 'Codes that work offline'}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/40 rtl:rotate-180" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title.en}>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/35">
                  {pick(col.title, lang)}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.en}>
                      <a
                        href="#deals"
                        className="group inline-flex items-center gap-1 text-[13px] text-white/60 transition-colors hover:text-white"
                      >
                        {pick(link, lang)}
                        <ArrowUpRight
                          className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-60 rtl:rotate-180"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/35">{pick(copy.footer.rights, lang)}</p>
          <div className="flex items-center gap-4 text-[12px] text-white/35">
            <span>{pick(copy.footer.made, lang)}</span>
            <span className="text-white/15">·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
              {lang === 'en' ? 'All systems verified' : 'كل الأنظمة موثّقة'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
