'use client'

import { useEffect, useId, useMemo, useRef } from 'react'

export type AdSlotProps = {
  /**
   * Identifiant stable (analytics + debug). Si absent, un id React est généré.
   */
  slotId?: string
  /**
   * Script externe (souvent fourni par une régie).
   * Idéalement pointer vers un endpoint “zone”.
   */
  scriptSrc?: string
  /**
   * Snippet inline (certains réseaux donnent un bout de JS/HTML).
   * À utiliser avec parcimonie; c'est volontairement opt-in.
   */
  html?: string
  /**
   * Réservation d’espace pour éviter le CLS.
   */
  width?: number | string
  height?: number | string
  minHeight?: number | string
  className?: string
}

function toCssSize(v: AdSlotProps['width']): string | undefined {
  if (v === undefined) return undefined
  if (typeof v === 'number') return `${v}px`
  return v
}

export default function AdSlot({
  slotId,
  scriptSrc,
  html,
  width,
  height,
  minHeight,
  className,
}: AdSlotProps) {
  const reactId = useId()
  const id = useMemo(() => slotId ?? `ad-${reactId.replace(/[:]/g, '')}`, [slotId, reactId])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Nettoyage “safe” avant injection (évite doublons sur navigation)
    el.replaceChildren()

    if (html) {
      // NOTE: nécessaire pour certains snippets (réseaux historiques).
      // Ne pas passer des données utilisateur ici.
      el.innerHTML = html
    }

    if (scriptSrc) {
      const script = document.createElement('script')
      script.async = true
      script.src = scriptSrc
      script.setAttribute('data-ad-slot', id)
      el.appendChild(script)
    }

    return () => {
      el.replaceChildren()
    }
  }, [id, scriptSrc, html])

  return (
    <div
      id={id}
      ref={ref}
      className={className}
      style={{
        width: toCssSize(width),
        height: toCssSize(height),
        minHeight: toCssSize(minHeight),
        display: 'block',
        overflow: 'hidden',
      }}
      data-ad-slot-root
    />
  )
}

