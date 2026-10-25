import { useMemo, useState } from 'react'
import { ArrowUpRight, Check, Clock, Copy, Flame, ShieldCheck, Tag, Ticket } from 'lucide-react'
import { accentStyles, type Deal } from '../data/deals'
import { useLang, pick } from '../lib/lang'
import { copy as dict } from '../lib/copy'
import { useClipboard } from '../lib/useClipboard'
import { buildOutboundLink, disclosureLabel } from '../lib/affiliate'

type Props = {
  deal: Deal
  index?: number
  variant?: 'grid' | 'rail'
}

const numberFmt = new Intl.NumberFormat('en-US')

export default function DealCard({ deal, index = 0, variant = 'grid' }: Props) {
  const { lang, dir } = useLang()
  const { copied, copy } = useClipboard()
  const [revealed, setRevealed] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const accent = accentStyles[deal.accent]
  const isCopied = copied === deal.id
  const expiringSoon = deal.expiresInDays <= 7

  const link = useMemo(
    () => buildOutboundLink(deal.store, deal.id, deal.storeUrl),
    [deal.store, deal.id, deal.storeUrl],
  )

  /** Fire-and-forget click log so you can see which codes actually convert. */
  const logClick = (kind: 'code' | 'deal') => {
    try {
      const key = 'waffar.clicks'
      const raw = window.localStorage.getItem(key)
      const log = raw ? (JSON.parse(raw) as unknown[]) : []
      log.push({ id: deal.id, store: deal.store, kind, at: new Date().toISOString() })
      window.localStorage.setItem(key, JSON.stringify(log.slice(-200)))
    } catch {
      /* storage unavailable — non-fatal */
    }
  }

  const handleReveal = async () => {
    if (deal.type === 'deal') {
      logClick('deal')
      window.open(link.href, '_blank', 'noopener,noreferrer')
      return
    }
    setRevealed(true)
    logClick('code')
    if (deal.code) await copy(deal.code, deal.id)
  }

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#202020]/90 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-lift ${
        variant === 'rail' ? 'h-full' : ''
      }`}
      style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${accent.glow} to-transparent opacity-70`}
        aria-hidden="true"
      />

      {/* store row */}
      <div className="relative flex items-start justify-between gap-3 px-5 pt-5">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border ${accent.border} ${accent.bg} font-display text-sm font-bold ${accent.text}`}
            aria-hidden="true"
          >
            {deal.monogram}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-tight text-white">{deal.store}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-ash">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent.dot }}
                aria-hidden="true"
              />
              {pick(deal.badge, lang)}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span
            className={`rounded-full border px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-wide ${accent.border} ${accent.bg} ${accent.text}`}
          >
            {pick(deal.discount, lang)}
          </span>
          {deal.hot && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#FCA5A5]">
              <Flame className="h-3 w-3" aria-hidden="true" />
              {pick(dict.card.hot, lang)}
            </span>
          )}
        </div>
      </div>

      {/* headline */}
      <div className="relative px-5 pb-4 pt-3">
        <h3 className="text-pretty text-[15px] font-medium leading-relaxed text-white/90">
          {pick(deal.title, lang)}
        </h3>
      </div>

      {/* torn divider */}
      <div className="relative px-5" aria-hidden="true">
        <div className="relative flex items-center">
          <span className="notch -start-8" />
          <div className="flex-1 border-t border-dashed border-white/15" />
          <span className="notch -end-8" />
        </div>
      </div>

      {/* coupon body */}
      <div className="relative flex flex-1 flex-col justify-end gap-3 px-5 pb-5 pt-4">
        <div className="flex items-center justify-between text-[11px] text-ash">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
            {pick(dict.card.verified, lang)} · {deal.verifiedHoursAgo}
            {pick(dict.card.hoursAgo, lang)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {pick(dict.card.expires, lang)} {deal.expiresInDays} {pick(dict.card.days, lang)}
          </span>
        </div>

        {deal.type === 'code' ? (
          <div className="flex items-stretch gap-2">
            <div
              className={`relative flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl border border-dashed px-3 py-2.5 transition-colors ${
                isCopied ? 'border-mint/50 bg-mint/10' : 'border-white/20 bg-black/30'
              }`}
            >
              <code
                className={`truncate font-mono text-[13px] font-semibold tracking-[0.14em] ${
                  revealed ? 'text-white' : 'text-white/45'
                }`}
                aria-live="polite"
              >
                {revealed ? deal.code : '••••••'}
              </code>
              {isCopied ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-mint">
                  <Check className="h-3 w-3" aria-hidden="true" />
                  {pick(dict.card.copied, lang)}
                </span>
              ) : (
                <Tag className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden="true" />
              )}
            </div>
            <button
              type="button"
              onClick={handleReveal}
              className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 text-[12px] font-semibold transition-all duration-300 ${
                revealed
                  ? 'bg-white text-night hover:bg-white/90'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              aria-label={`${revealed ? pick(dict.card.copy, lang) : pick(dict.card.reveal, lang)} — ${deal.store}`}
            >
              {revealed ? (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">{pick(dict.card.copy, lang)}</span>
                </>
              ) : (
                <>
                  <Ticket className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">{pick(dict.card.reveal, lang)}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => logClick('deal')}
            className="flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-[12px] font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12]"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
              {pick(dict.card.noCode, lang)}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}

        <div className="flex items-center justify-between gap-2 text-[11px] text-white/40">
          <span>
            {numberFmt.format(deal.uses)} {pick(dict.card.used, lang)}
          </span>
          <button
            type="button"
            onClick={() => setShowTerms((v) => !v)}
            className="rounded-full px-2 py-1 font-medium text-white/50 underline decoration-dotted underline-offset-2 transition-colors hover:text-white"
            aria-expanded={showTerms}
          >
            {showTerms ? pick(dict.card.hideTerms, lang) : pick(dict.card.terms, lang)}
          </button>
        </div>

        {showTerms && (
          <p className="animate-fadeUp rounded-xl border border-white/[0.07] bg-black/30 p-3 text-[11.5px] leading-relaxed text-ash">
            {pick(deal.terms, lang)}
          </p>
        )}

        {expiringSoon && (
          <div className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-wider text-sun">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" />
            {pick(dict.card.expires, lang)} {deal.expiresInDays} {pick(dict.card.days, lang)}
          </div>
        )}

        <p className="text-[10px] leading-relaxed text-white/25">{disclosureLabel(link, lang)}</p>
      </div>

      <span className="sr-only" dir={dir}>
        {deal.store} — {pick(deal.title, lang)}
      </span>
    </article>
  )
}
