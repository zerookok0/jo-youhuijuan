import { useState, type FormEvent } from 'react'
import { Check, Loader2, Mail, Send, Sparkles } from 'lucide-react'
import { useLang, pick } from '../lib/lang'
import { copy } from '../lib/copy'

type State = 'idle' | 'loading' | 'done' | 'error'

export default function Newsletter() {
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    if (!valid) {
      setState('error')
      return
    }
    setState('loading')
    await new Promise((resolve) => window.setTimeout(resolve, 900))
    setState('done')
    setEmail('')
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#1B1B1B] px-6 py-10 sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden="true"
          >
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-grape/25 blur-[110px]" />
            <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-azure/20 blur-[110px]" />
            <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <div className="pill mb-4 !border-blush/25 !bg-blush/10 !text-[#F9A8D4]">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                {pick(copy.newsletter.eyebrow, lang)}
              </div>
              <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.3rem)] font-bold leading-tight tracking-tight text-white">
                {pick(copy.newsletter.title, lang)}
              </h2>
              <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-ash">
                {pick(copy.newsletter.body, lang)}
              </p>
            </div>

            <div>
              <form onSubmit={submit} className="flex flex-col gap-2.5 sm:flex-row">
                <label className="relative flex flex-1 items-center gap-2 rounded-full border border-white/12 bg-black/40 px-4 transition-colors focus-within:border-grape/60">
                  <Mail className="h-4 w-4 shrink-0 text-white/35" aria-hidden="true" />
                  <span className="sr-only">{pick(copy.newsletter.placeholder, lang)}</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (state === 'error') setState('idle')
                    }}
                    placeholder={pick(copy.newsletter.placeholder, lang)}
                    className="min-w-0 flex-1 bg-transparent py-3.5 text-[14px] text-white placeholder:text-white/30 focus:outline-none"
                    aria-invalid={state === 'error'}
                    aria-describedby="newsletter-status"
                    disabled={state === 'loading' || state === 'done'}
                  />
                </label>
                <button
                  type="submit"
                  disabled={state === 'loading' || state === 'done'}
                  className="btn-primary shrink-0 !px-5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {state === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : state === 'done' ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <>
                      {pick(copy.newsletter.cta, lang)}
                      <Send className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>

              <p
                id="newsletter-status"
                role="status"
                className={`mt-3 min-h-[18px] text-[12.5px] ${
                  state === 'error' ? 'text-[#FCA5A5]' : state === 'done' ? 'text-mint' : 'text-white/40'
                }`}
              >
                {state === 'error'
                  ? pick(copy.newsletter.invalid, lang)
                  : state === 'done'
                    ? pick(copy.newsletter.success, lang)
                    : pick(copy.newsletter.fine, lang)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
