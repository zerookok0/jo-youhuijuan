import { useMemo, useState } from 'react'
import {
  Apple,
  ArrowLeft,
  BellRing,
  Check,
  ChevronRight,
  Copy,
  Download,
  Globe,
  MonitorSmartphone,
  Share,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WifiOff,
} from 'lucide-react'
import { copy as site } from '../lib/copy'
import { copy as dl } from '../lib/copyDownload'
import { useLang, pick } from '../lib/lang'
import { useClipboard } from '../lib/useClipboard'
import { useInstallPrompt } from '../lib/useInstall'
import QrArt from '../components/QrArt'

const featureIcons = [WifiOff, Copy, BellRing, ShieldCheck]
const platformIcons = [Smartphone, Apple, Globe]

type Platform = {
  key: string
  name: string
  meta: { en: string; ar: string }
  status: 'ready' | 'soon'
  href: string
  note: { en: string; ar: string }
}

const platforms: Platform[] = [
  {
    key: 'android',
    name: 'Android',
    meta: { en: 'Installable now via Chrome', ar: 'قابل للتثبيت الآن عبر كروم' },
    status: 'ready',
    href: '#install',
    note: {
      en: 'Adds to your home screen as a standalone app with offline codes.',
      ar: 'يُضاف إلى شاشتك الرئيسية كتطبيق مستقل مع أكواد بدون إنترنت.',
    },
  },
  {
    key: 'ios',
    name: 'iPhone & iPad',
    meta: { en: 'Safari → Share → Add to Home Screen', ar: 'سفاري ← مشاركة ← إضافة إلى الشاشة الرئيسية' },
    status: 'ready',
    href: '#install',
    note: {
      en: 'Two taps in Safari. Works exactly like a native app once added.',
      ar: 'نقرتان في سفاري. يعمل تماماً كتطبيق أصلي بعد الإضافة.',
    },
  },
  {
    key: 'desktop',
    name: 'Desktop',
    meta: { en: 'Install from your browser bar', ar: 'ثبّت من شريط المتصفح' },
    status: 'ready',
    href: '#install',
    note: {
      en: 'Chrome and Edge show an install icon in the address bar.',
      ar: 'يعرض كروم وإيدج أيقونة تثبيت في شريط العنوان.',
    },
  },
]

export default function DownloadPage({ onBack }: { onBack: () => void }) {
  const { lang } = useLang()
  const { state, install } = useInstallPrompt()
  const { copied, copy } = useClipboard()
  const [feedback, setFeedback] = useState<string | null>(null)

  const pageUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://waffar.jo/download'
    return `${window.location.origin}/download`
  }, [])

  const handleInstall = async () => {
    const result = await install()
    if (result === 'ios-manual') {
      setFeedback(
        lang === 'ar'
          ? 'في سفاري: اضغط زر المشاركة ثم «إضافة إلى الشاشة الرئيسية».'
          : 'In Safari: tap the Share button, then "Add to Home Screen".',
      )
    } else if (result === 'accepted') {
      setFeedback(lang === 'ar' ? 'تم التثبيت — ابحث عن وفّر على شاشتك.' : 'Installed — look for Waffr on your home screen.')
    } else {
      setFeedback(null)
    }
  }

  const stateLabel = {
    installed: pick(dl.install.installed, lang),
    available: pick(dl.install.cta, lang),
    'ios-manual': lang === 'ar' ? 'أضف إلى الشاشة الرئيسية' : 'Add to Home Screen',
    unsupported: pick(dl.install.notSupported, lang),
  }[state]

  return (
    <div className="min-h-screen">
      {/* backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_50%_0%,#000_10%,transparent_70%)]" />
        <div className="absolute left-1/2 top-[-20%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-grape/22 blur-[150px]" />
        <div className="absolute end-[-8%] top-[26%] h-[360px] w-[360px] rounded-full bg-azure/14 blur-[120px]" />
        <div className="absolute start-[-6%] top-[56%] h-[320px] w-[320px] rounded-full bg-blush/12 blur-[130px]" />
      </div>

      <div className="shell pb-20 pt-8 sm:pt-10">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[12.5px] font-medium text-white/70 transition-all hover:border-white/25 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
          {pick(dl.back, lang)}
        </button>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* left column */}
          <div className="animate-fadeUp">
            <div className="pill mb-5 !border-grape/25 !bg-grape/10 !text-[#D5C9FF]">
              <MonitorSmartphone className="h-3 w-3" aria-hidden="true" />
              {pick(dl.eyebrow, lang)}
            </div>

            <h1 className="font-display text-[clamp(2.3rem,6vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              {pick(dl.title1, lang)}
              <br />
              <span className="bg-gradient-to-r from-[#C4B0FF] via-white to-[#7DD3FC] bg-clip-text text-transparent">
                {pick(dl.title2, lang)}
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ash">
              {pick(dl.body, lang)}
            </p>

            {/* install block */}
            <div id="install" className="mt-8 scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleInstall}
                  disabled={state === 'installed'}
                  className="btn-primary w-full !py-3.5 disabled:cursor-default disabled:opacity-70 sm:w-auto"
                >
                  {state === 'installed' ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Download className="h-4 w-4" aria-hidden="true" />
                  )}
                  {stateLabel}
                </button>

                <button
                  type="button"
                  onClick={() => copy(pageUrl, 'url')}
                  className="btn-ghost w-full !py-3.5 sm:w-auto"
                >
                  {copied === 'url' ? (
                    <Check className="h-4 w-4 text-mint" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied === 'url'
                    ? pick(site.card.copied, lang)
                    : lang === 'ar'
                      ? 'انسخ الرابط'
                      : 'Copy link'}
                </button>
              </div>

              <p className="mt-3 text-[12px] leading-relaxed text-white/40">
                {pick(dl.install.hint, lang)}
              </p>

              {feedback && (
                <p className="mt-3 animate-pop rounded-xl border border-grape/25 bg-grape/10 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#D5C9FF]">
                  {feedback}
                </p>
              )}

              {state === 'ios-manual' && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-[12px] text-white/60">
                  <Share className="h-3.5 w-3.5 text-azure" aria-hidden="true" />
                  {lang === 'ar'
                    ? 'سفاري: مشاركة ← إضافة إلى الشاشة الرئيسية'
                    : 'Safari: Share → Add to Home Screen'}
                </p>
              )}
            </div>

            {/* platforms */}
            <div className="mt-10">
              <h2 className="font-display text-[19px] font-semibold text-white">
                {pick(dl.platforms.title, lang)}
              </h2>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ash">
                {pick(dl.platforms.body, lang)}
              </p>

              <div className="mt-4 space-y-2.5">
                {platforms.map((platform, i) => {
                  const Icon = platformIcons[i] ?? Smartphone
                  return (
                    <a
                      key={platform.key}
                      href={platform.href}
                      className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#202020] px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lift"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-white/80">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[14.5px] font-semibold text-white">{platform.name}</span>
                          <span className="rounded-full border border-mint/30 bg-mint/10 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-mint">
                            {pick(dl.notice.swipe, lang)}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] text-white/45">
                          {pick(platform.meta, lang)}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-white/70 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* right column */}
          <div className="relative">
            {/* phone */}
            <div className="relative mx-auto w-full max-w-[340px] animate-float [--tilt:2deg]">
              <div
                className="absolute -inset-5 rounded-[46px] bg-gradient-to-br from-grape/25 via-transparent to-azure/20 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[36px] border border-white/15 bg-[#141414] p-2.5 shadow-lift">
                <div className="relative overflow-hidden rounded-[28px] bg-night">
                  <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" aria-hidden="true" />

                  {/* mock app screen */}
                  <div className="relative px-4 pb-5 pt-10">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[13px] font-bold">
                        Waffar<span className="text-azure">.jo</span>
                      </span>
                      <span className="rounded-full bg-mint/12 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-mint">
                        offline ready
                      </span>
                    </div>

                    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] text-white/35">
                      {lang === 'ar' ? 'ابحث عن متجر…' : 'Search a store…'}
                    </div>

                    <div className="mt-3 space-y-2">
                      {[
                        { store: 'iHerb', off: '25%', code: 'WAFF25', tone: 'text-[#6EE7B7] border-[#10B981]/30 bg-[#10B981]/12' },
                        { store: 'Temu', off: '30%', code: 'WAFF30', tone: 'text-[#FCA5A5] border-[#EF4444]/30 bg-[#EF4444]/12' },
                        { store: 'Namshi', off: '15%', code: 'NAM15WA', tone: 'text-[#C4B0FF] border-[#9E7FFF]/30 bg-[#9E7FFF]/12' },
                      ].map((row) => (
                        <div
                          key={row.store}
                          className="rounded-xl border border-white/[0.08] bg-[#1E1E1E] p-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10.5px] font-semibold text-white">{row.store}</span>
                            <span className={`rounded-full border px-1.5 py-0.5 text-[8.5px] font-bold ${row.tone}`}>
                              {row.off}
                            </span>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between gap-1.5 rounded-lg border border-dashed border-white/20 bg-black/40 px-2 py-1.5">
                            <code className="font-mono text-[9.5px] tracking-[0.15em] text-white/85">
                              {row.code}
                            </code>
                            <span className="rounded bg-white px-1.5 py-0.5 text-[7.5px] font-bold uppercase text-night">
                              copy
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C4B0FF] via-grape to-azure py-2 text-[10px] font-bold text-night">
                      <Download className="h-3 w-3" aria-hidden="true" />
                      {lang === 'ar' ? 'ثبّت التطبيق' : 'Install app'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR card */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <QrArt
                  value={pageUrl}
                  label={pick(dl.qr.title, lang)}
                  className="h-24 w-24 shrink-0 rounded-xl"
                />
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-white">{pick(dl.qr.title, lang)}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/45">
                    {pick(dl.qr.body, lang)}
                  </p>
                  <p className="mt-2 truncate font-mono text-[10.5px] text-white/30">{pageUrl}</p>
                </div>
              </div>
            </div>

            {/* honesty notice */}
            <div className="mt-3 flex gap-2.5 rounded-2xl border border-sun/20 bg-sun/[0.07] p-3.5">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#FCD34D]" aria-hidden="true" />
              <div>
                <p className="text-[12px] font-semibold text-[#FCD34D]">
                  {pick(dl.notice.title, lang)}
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-white/55">
                  {pick(dl.notice.body, lang)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* features */}
        <div className="mt-16">
          <h2 className="font-display text-[clamp(1.5rem,3.4vw,2rem)] font-bold tracking-tight">
            {pick(dl.features.title, lang)}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dl.features.items.map((item, i) => {
              const Icon = featureIcons[i] ?? Sparkles
              return (
                <div
                  key={i}
                  className="group rounded-2xl border border-white/[0.08] bg-[#1F1F1F] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-grape/25 bg-grape/12 text-[#C4B0FF]">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[14px] font-semibold text-white">{pick(item.title, lang)}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ash">{pick(item.body, lang)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
