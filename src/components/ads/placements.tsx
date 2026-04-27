'use client'

import { adsConfig } from './config'
import ABAdSlot from './ABAdSlot'
import LazyAdSlot from './LazyAdSlot'
import AdWithFallback from './AdWithFallback'
import AdProviderSlot from './AdProviderSlot'

export function TopLeaderboardAd() {
  if (!adsConfig.enabled) return null
  if (!adsConfig.slots.headerLeaderboard.scriptSrc) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
      <LazyAdSlot
        slotId="pp-header-leaderboard"
        width={adsConfig.slots.headerLeaderboard.width}
        height={adsConfig.slots.headerLeaderboard.height}
        scriptSrc={adsConfig.slots.headerLeaderboard.scriptSrc}
        eager={true}
      />
    </div>
  )
}

export function InContentAd() {
  if (!adsConfig.enabled) return null
  if (!adsConfig.slots.inContentMediumRect.scriptSrc) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
      <LazyAdSlot
        slotId="pp-incontent-mrect"
        width={adsConfig.slots.inContentMediumRect.width}
        height={adsConfig.slots.inContentMediumRect.height}
        scriptSrc={adsConfig.slots.inContentMediumRect.scriptSrc}
      />
    </div>
  )
}

export function SidebarAd() {
  if (!adsConfig.enabled) return null
  if (!adsConfig.slots.sidebarHalfPage.scriptSrc) return null

  return (
    <div style={{ position: 'sticky', top: 96 }}>
      <LazyAdSlot
        slotId="pp-sidebar-halfpage"
        width={adsConfig.slots.sidebarHalfPage.width}
        height={adsConfig.slots.sidebarHalfPage.height}
        scriptSrc={adsConfig.slots.sidebarHalfPage.scriptSrc}
      />
    </div>
  )
}

/**
 * AdProvider (magsrv) - slot "zoneid" (HTML <ins> + AdProvider.push()).
 * Valeurs par défaut = snippet fourni.
 */
export function AdProviderZone5909908() {
  if (!adsConfig.enabled) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
      <AdProviderSlot zoneId={5909908} insClassName="eas6a97888e2" minHeight={250} />
    </div>
  )
}

/**
 * Exemple “A/B”:
 * - Variant A = script a
 * - Variant B = script b
 */
export function ABHeaderLeaderboard({
  aScriptSrc,
  bScriptSrc,
}: {
  aScriptSrc?: string
  bScriptSrc?: string
}) {
  if (!adsConfig.enabled) return null

  return (
    <ABAdSlot
      slotId="pp-ab-header-leaderboard"
      width={728}
      height={90}
      aScriptSrc={aScriptSrc}
      bScriptSrc={bScriptSrc}
      eager={true}
    />
  )
}

/**
 * Exemple fallback/rotation:
 * - tente ExoClick, sinon JuicyAds
 * (tu passes les URLs “zone script” via env/props)
 */
export function HeaderWithFallback({
  sources,
}: {
  sources: Array<{ name: string; scriptSrc: string }>
}) {
  if (!adsConfig.enabled) return null
  if (!sources.length) return null

  return <AdWithFallback slotId="pp-header-fallback" width={728} height={90} sources={sources} />
}

