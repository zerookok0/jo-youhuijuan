import { useCallback, useEffect, useRef, useState } from 'react'

export function useClipboard(resetMs = 2200) {
  const [copied, setCopied] = useState<string | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const copy = useCallback(
    async (text: string, key = text) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
        } else {
          const area = document.createElement('textarea')
          area.value = text
          area.setAttribute('readonly', '')
          area.style.position = 'absolute'
          area.style.left = '-9999px'
          document.body.appendChild(area)
          area.select()
          document.execCommand('copy')
          document.body.removeChild(area)
        }
        setCopied(key)
        if (timer.current) window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(null), resetMs)
        return true
      } catch {
        return false
      }
    },
    [resetMs],
  )

  return { copied, copy }
}
