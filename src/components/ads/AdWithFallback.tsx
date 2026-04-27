'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { adsConfig } from './config'

export type AdWithFallbackProps = {
  slotId?: string
  width?: number
  height?: number
  /**
   * Sources à tenter, dans l’ordre. Mettre des URLs “zone script”.
   */
  sources: Array<{ name: string; scriptSrc: string }>
}

export default function AdWithFallback({ slotId, width, height, sources }: AdWithFallbackProps) {
  const reactId = useId()
  const id = useMemo(() => slotId ?? `adfb-${reactId.replace(/[:]/g, '')}`, [slotId, reactId])
  const ref = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!adsConfig.enabled) return
    const el = ref.current
    if (!el) return

    const src = sources[idx]
    if (!src?.scriptSrc) return

    el.replaceChildren()
    const script = document.createElement('script')
    script.async = true
    script.src = src.scriptSrc

    script.onerror = () => {
      // on tente le fallback suivant
      if (idx < sources.length - 1) setIdx((v) => v + 1)
    }

    el.appendChild(script)
    return () => el.replaceChildren()
  }, [idx, sources])

  return (
    <div
      id={id}
      ref={ref}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        minHeight: height ? `${height}px` : undefined,
        overflow: 'hidden',
      }}
      data-ad-fallback
    />
  )
}

