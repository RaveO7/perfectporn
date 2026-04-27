'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { adsConfig } from './config'

function injectScriptOnce(src: string, id: string) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.setAttribute('data-cfasync', 'false')
  script.src = src
  document.body.appendChild(script)
}

function safeGet(key: string) {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

function safeGetInt(key: string, fallback = 0) {
  const v = safeGet(key)
  const n = v ? Number.parseInt(v, 10) : NaN
  return Number.isFinite(n) ? n : fallback
}

function safeGetFloat(key: string, fallback = 0) {
  const v = safeGet(key)
  const n = v ? Number.parseFloat(v) : NaN
  return Number.isFinite(n) ? n : fallback
}

/**
 * Boot minimal des pubs (client-only):
 * - déclenchement sur 1er clic/tap (meilleure compat popup blockers)
 * - capping hybride: toutes les N pages OU toutes les X minutes
 * - feature flag via NEXT_PUBLIC_ADS_ENABLED
 */
export default function AdsBoot() {
  const pathname = usePathname()

  // Compteur “pages vues depuis le dernier popunder”
  useEffect(() => {
    if (!adsConfig.enabled) return

    const pagesKey = `${adsConfig.admaven.sessionCapKey}:pagesSince`
    const lastPathKey = `${adsConfig.admaven.sessionCapKey}:lastPath`

    const lastPath = safeGet(lastPathKey)
    if (lastPath !== pathname) {
      safeSet(lastPathKey, pathname || '/')
      const current = safeGetInt(pagesKey, 0)
      safeSet(pagesKey, String(current + 1))
    }
  }, [pathname])

  useEffect(() => {
    if (!adsConfig.enabled) return

    const capKey = adsConfig.admaven.sessionCapKey
    const pagesKey = `${capKey}:pagesSince`
    const lastFireKey = `${capKey}:lastFireTs`

    const shouldFireNow = () => {
      const pagesSince = safeGetInt(pagesKey, 0)
      const lastFireTs = safeGetFloat(lastFireKey, 0)
      const minutesSince = lastFireTs ? (Date.now() - lastFireTs) / 60000 : Number.POSITIVE_INFINITY

      return (
        pagesSince >= adsConfig.admaven.pageCap ||
        minutesSince >= adsConfig.admaven.minuteCap
      )
    }

    const onFirstUserAction = () => {
      if (!shouldFireNow()) return
      injectScriptOnce(adsConfig.admaven.popunderScriptSrc, 'pp-admaven-popunder')
      // reset caps
      safeSet(lastFireKey, String(Date.now()))
      safeSet(pagesKey, '0')

      window.removeEventListener('pointerdown', onFirstUserAction, { capture: true } as any)
      window.removeEventListener('keydown', onFirstUserAction, { capture: true } as any)
    }

    // pointerdown = mobile/desktop; keydown = navigation clavier
    window.addEventListener('pointerdown', onFirstUserAction, { capture: true, passive: true })
    window.addEventListener('keydown', onFirstUserAction, { capture: true })

    return () => {
      window.removeEventListener('pointerdown', onFirstUserAction, { capture: true } as any)
      window.removeEventListener('keydown', onFirstUserAction, { capture: true } as any)
    }
  }, [])

  return null
}

