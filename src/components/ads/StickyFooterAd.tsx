'use client'

import { useEffect, useState } from 'react'
import { adsConfig } from './config'
import AdProviderSlot from './AdProviderSlot'

export default function StickyFooterAd() {
  if (!adsConfig.enabled) return null

  const [isMobile, setIsMobile] = useState(false)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    // Mobile-only: suit les changements (rotation / resize)
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    try {
      setClosed(window.sessionStorage.getItem('pp:ad:stickyFooterClosed') === '1')
    } catch {
      // ignore (privacy mode / blocked storage)
    }
  }, [])

  if (!isMobile || closed) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        padding: '8px 0 calc(8px + env(safe-area-inset-bottom, 0px))',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(6px)',
      }}
      data-ad-sticky-footer
    >
      <button
        type="button"
        aria-label="Fermer la publicité"
        onClick={() => {
          setClosed(true)
          try {
            window.sessionStorage.setItem('pp:ad:stickyFooterClosed', '1')
          } catch {
            // ignore
          }
        }}
        style={{
          position: 'absolute',
          right: 6,
          bottom: 6,
          width: 24,
          height: 24,
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.25)',
          background: 'rgba(0,0,0,0.35)',
          color: '#fff',
          fontSize: 22,
          lineHeight: 1,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <span style={{ transform: 'translateY(-1px)' }}>×</span>
      </button>
      <AdProviderSlot
        zoneId={5909922}
        insClassName="eas6a97888e10"
        minHeight={adsConfig.slots.footerSticky.height}
      />
    </div>
  )
}

