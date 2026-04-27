'use client'

import { useEffect, useRef, useState } from 'react'
import AdSlot, { type AdSlotProps } from './AdSlot'

export type LazyAdSlotProps = AdSlotProps & {
  rootMargin?: string
  threshold?: number
  /**
   * Si true, le slot se charge immédiatement (debug / above-the-fold).
   */
  eager?: boolean
}

export default function LazyAdSlot({
  rootMargin = '400px 0px',
  threshold = 0.01,
  eager = false,
  ...slotProps
}: LazyAdSlotProps) {
  const [visible, setVisible] = useState(eager)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible) return
    const node = placeholderRef.current
    if (!node) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    obs.observe(node)
    return () => obs.disconnect()
  }, [visible, rootMargin, threshold])

  if (!visible) {
    return (
      <div
        ref={placeholderRef}
        style={{
          width: typeof slotProps.width === 'number' ? `${slotProps.width}px` : slotProps.width,
          height: typeof slotProps.height === 'number' ? `${slotProps.height}px` : slotProps.height,
          minHeight:
            typeof slotProps.minHeight === 'number' ? `${slotProps.minHeight}px` : slotProps.minHeight,
        }}
        data-ad-placeholder
      />
    )
  }

  return <AdSlot {...slotProps} />
}

