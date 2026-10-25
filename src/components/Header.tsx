import { useEffect, useState } from 'react'
import { ChevronDown, Globe, Menu, Search, Smartphone, Sparkles, X } from 'lucide-react'
import { useLang } from '../lib/lang'
import { copy } from '../lib/copy'

const navLinks = [
  { key: 'allDeals', href: '#deals' },
  { key: 'stores', href: '#stores' },
  { key: 'categories', href: '#categories' },
  { key: 'guide', href: '#how' },
  { key: 'faq', href: '#faq' },
] as const

export default function Header({ onDownload }: { onDownload: () => void }) {
  const { lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en')

  return (
    <>
      <a
        href="#deals"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
      >
        {copy.misc.skip[lang]}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.07] bg-night/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-4">
          <a href="#top" className="group flex items-center gap-2.5" aria-label={`${copy.brand} home`}>
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[14px] bg-gradient-to-br from-[#C4B0FF] via-grape to-azure shadow-glow">
              <span className="absolute inset-[1.5px] rounded-[12px] bg-night/85" />
              <span className="relative font-display text-[15px] font-bold text-white">و</span>
            </span>
            <span className="font-display text-[18px] font-bold tracking-tight text-white">
              {copy.brand}
              <span className="text-azure">.jo</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {copy.nav[link.key][lang]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[12.5px] font-semibold text-white/80 transition-all hover:border-white/25 hover:text-white sm:inline-flex"
              aria-label={`Switch language to ${copy.misc.langToggle[lang]}`}
            >
              <Globe className="h-3.5 w-3.5 text-grape" aria-hidden="true" />
              {copy.misc.langToggle[lang]}
            </button>

            <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[12.5px] font-medium text-white/70 md:inline-flex">
              <span aria-hidden="true">🇯🇴</span>
              {copy.footer.country[lang]}
              <span className="text-white/25">/</span>
              <span className="text-mint">{copy.footer.currency[lang]}</span>
              <ChevronDown className="h-3 w-3 text-white/40" aria-hidden="true" />
            </div>

            <button
              type="button"
              onClick={onDownload}
              className="hidden items-center gap-1.5 rounded-full border border-grape/30 bg-grape/12 px-3 py-2 text-[12.5px] font-semibold text-[#D5C9FF] transition-all hover:border-grape/50 hover:bg-grape/20 lg:inline-flex"
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              {lang === 'ar' ? 'التطبيق' : 'Get the app'}
            </button>

            <a href="#deals" className="btn-primary hidden !px-4 !py-2 !text-[12.5px] lg:inline-flex">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              {copy.hero.searchCta[lang]}
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label={copy.misc.menu[lang]}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-night/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
            aria-label={copy.misc.close[lang]}
          />
          <div className="absolute inset-x-3 top-3 animate-pop overflow-hidden rounded-3xl border border-white/10 bg-[#1C1C1C] p-5 shadow-lift">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-lg font-bold">
                {copy.brand}
                <span className="text-azure">.jo</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white"
                aria-label={copy.misc.close[lang]}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 text-[15px] font-medium text-white/80 transition-colors hover:bg-white/[0.06]"
                >
                  {copy.nav[link.key][lang]}
                  <Sparkles className="h-3.5 w-3.5 text-grape/60" aria-hidden="true" />
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <button type="button" onClick={toggleLang} className="btn-ghost w-full">
                <Globe className="h-4 w-4 text-grape" aria-hidden="true" />
                {copy.misc.langToggle[lang]}
              </button>
              <a href="#deals" onClick={() => setOpen(false)} className="btn-primary w-full">
                {copy.hero.searchCta[lang]}
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onDownload()
                }}
                className="btn-ghost w-full"
              >
                <Smartphone className="h-4 w-4 text-grape" aria-hidden="true" />
                {lang === 'ar' ? 'حمّل التطبيق' : 'Get the app'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
