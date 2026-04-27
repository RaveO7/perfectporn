'use client'

import { useEffect, useMemo } from 'react'

declare global {
  interface Window {
    AdProvider?: any[]
  }
}

function injectScriptOnce(src: string, id: string) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.type = 'application/javascript'
  script.src = src
  document.body.appendChild(script)
}

export type AdProviderSlotProps = {
  zoneId: number | string
  /**
   * Classe fournie par AdProvider (ex: "eas6a97888e2").
   * Elle sert à identifier le format/placement côté régie.
   */
  insClassName: string
  className?: string
  /**
   * Réserver de l’espace pour éviter le CLS (optionnel mais recommandé).
   */
  minHeight?: number | string
  /**
   * URL du loader AdProvider.
   */
  scriptSrc?: any
}

export default function AdProviderSlot({
  zoneId,
  insClassName,
  className,
  minHeight,
  scriptSrc,
}: AdProviderSlotProps) {
  const zoneIdStr = String(zoneId)
  const dataKey = useMemo(() => `pp-adprovider-zone-${zoneIdStr}`, [zoneIdStr])

  useEffect(() => {
    injectScriptOnce(scriptSrc, 'pp-adprovider-lib')

    // Déclenchement après montage: l'ins est présent dans le DOM.
    // AdProvider est un "queue array"; push fonctionne même si le script n'est pas encore prêt.
    window.AdProvider = window.AdProvider || []
    window.AdProvider.push({ serve: {} })
  }, [dataKey, scriptSrc])

  return (
    <div className={className} style={{ minHeight }} data-ad-provider-slot={dataKey}>
      <ins className={insClassName} data-zoneid={zoneIdStr} />
    </div>
  )
}

