'use client'

import { adsConfig } from './config'
import LazyAdSlot, { type LazyAdSlotProps } from './LazyAdSlot'

export type ABAdSlotProps = Omit<LazyAdSlotProps, 'scriptSrc' | 'html'> & {
  aScriptSrc?: string
  bScriptSrc?: string
  aHtml?: string
  bHtml?: string
}

export default function ABAdSlot({
  aScriptSrc,
  bScriptSrc,
  aHtml,
  bHtml,
  ...rest
}: ABAdSlotProps) {
  const isB = adsConfig.ab.variant.toUpperCase() === 'B'

  return (
    <LazyAdSlot
      {...rest}
      scriptSrc={isB ? bScriptSrc : aScriptSrc}
      html={isB ? bHtml : aHtml}
    />
  )
}

