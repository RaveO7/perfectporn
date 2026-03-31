'use client'

import { useEffect } from 'react'

export default function PopMagicAd() {
  useEffect(() => {
    // Créer et injecter le script externe
    const script = document.createElement('script')
    script.setAttribute('data-cfasync', 'false')
    script.src = '//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1250993'
    script.async = true

    // Ajouter le script au document
    document.body.appendChild(script)

    // Cleanup: retirer le script lors du démontage
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  // Ce composant ne rend rien visuellement
  return null
}
