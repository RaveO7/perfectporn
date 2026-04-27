'use client'

import React from 'react'
import { adsConfig } from './config'
import AdProviderSlot from './AdProviderSlot'



function hashStringToIndex(input: string, modulo: number) {
  // Hash simple et stable (pas crypto) -> même titre pour le même id.
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0
  }
  const idx = Math.abs(h) % modulo
  return idx
}



export type InFeedAdDefinition =
  | {
    id: string
    index: number
    title?: string
    network: 'adprovider'
    zoneId: number | string
    insClassName: string
  }

export type GaleryInjection = {
  key: string
  index: number
  node: React.ReactNode
}

function AdCard({
  children,
  title = 'Vidéo sponsorisée',
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div className="group">
      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
        {children}
      </div>
      <h3 className="text-[16px] font-[600] leading-5 tracking-wide mt-1 break-words max-h-10 overflow-hidden text-timeVideo group-hover:text-white duration-[400ms] ease-in-out">
        {title}
      </h3>
    </div>
  )
}

function renderInFeedAd(def: InFeedAdDefinition) {
  switch (def.network) {
    case 'adprovider':
      return (
        <AdCard title={""}>
          <AdProviderSlot
            zoneId={def.zoneId}
            insClassName={def.insClassName}
            className="w-full h-full flex items-center justify-center"
            minHeight="100%"
            scriptSrc='https://a.magsrv.com/ad-provider.js'
          />
        </AdCard>
      )
  }
}

/**
 * In-feed ads: définies ici, partout dans le site.
 * Pour changer la position: change `index`.
 * Pour changer la pub: change `zoneId` / `insClassName` (ou `network` si autre régie plus tard).
 */
export const inFeedAds: InFeedAdDefinition[] = [
  { id: 'feed-1', index: 4, network: 'adprovider', zoneId: 5909908, insClassName: 'eas6a97888e2' },
  { id: 'feed-2', index: 14, network: 'adprovider', zoneId: 5909918, insClassName: 'eas6a97888e2' },
  { id: 'feed-3', index: 19, network: 'adprovider', zoneId: 5909920, insClassName: 'eas6a97888e2' },
]

export function getInFeedInjections(): GaleryInjection[] {
  if (!adsConfig.enabled) return []
  return inFeedAds.map((def) => ({
    key: def.id,
    index: def.index,
    node: renderInFeedAd(def),
  }))
}
