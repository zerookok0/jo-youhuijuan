import { AlertTriangle, DatabaseZap, RefreshCw } from 'lucide-react'
import type { Lang } from '../data/deals'

type Props = {
  isDemo: boolean
  loading: boolean
  error: string | null
  updatedAt: string | null
  onRefresh: () => void
  lang: Lang
}

/**
 * Honesty control: tells you (and your visitors) whether the codes on screen are
 * demo rows or rows pulled from the live affiliate feed. It disappears as soon as
 * a feed is configured and healthy, so it costs nothing once you go live.
 */
export default function SourceBadge({ isDemo, loading, error, updatedAt, onRefresh, lang }: Props) {
  if (!isDemo && !loading && !error) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-mint">
        <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
        {lang === 'ar' ? 'بيانات مباشرة' : 'Live feed'}
      </span>
    )
  }

  if (loading) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white/60">
        <RefreshCw className="h-3 w-3 animate-spin" aria-hidden="true" />
        {lang === 'ar' ? 'جارٍ التحديث' : 'Syncing feed'}
      </span>
    )
  }

  const failed = Boolean(error)

  return (
    <button
      type="button"
      onClick={onRefresh}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide transition-colors ${
        failed
          ? 'border-sun/35 bg-sun/10 text-[#FCD34D] hover:bg-sun/20'
          : 'border-white/12 bg-white/[0.04] text-white/50 hover:border-white/25 hover:text-white/80'
      }`}
      title={
        failed
          ? `${error} — click to retry`
          : lang === 'ar'
            ? 'بيانات تجريبية — أضف رابط الـ feed لتفعيل الأكواد الحقيقية'
            : 'Demo rows — add VITE_DEALS_FEED_URL to serve real codes'
      }
    >
      {failed ? (
        <AlertTriangle className="h-3 w-3" aria-hidden="true" />
      ) : (
        <DatabaseZap className="h-3 w-3" aria-hidden="true" />
      )}
      {failed
        ? lang === 'ar'
          ? 'تعذر الاتصال بالـ feed'
          : 'Feed offline — demo data'
        : lang === 'ar'
          ? 'بيانات تجريبية'
          : 'Demo data'}
      {updatedAt && (
        <span className="text-white/30">
          · {new Date(updatedAt).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-GB')}
        </span>
      )}
    </button>
  )
}
