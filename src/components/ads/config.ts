export const adsConfig = {
  enabled:
    process.env.NEXT_PUBLIC_ADS_ENABLED === '1' ||
    process.env.NEXT_PUBLIC_ADS_ENABLED === 'true',
  admaven: {
    popunderScriptSrc:
      process.env.NEXT_PUBLIC_ADMAVEN_POPUNDER_SRC ||
      'https://dcbbwymp1bhlf.cloudfront.net/?wbbcd=1250993',
    sessionCapKey:
      process.env.NEXT_PUBLIC_ADMAVEN_POPUNDER_SESSION_KEY ||
      'pp:admaven:popunder:fired',
    // Capping hybride: toutes les N pages OU toutes les X minutes.
    // Valeurs par défaut demandées: 4 pages / 10 minutes.
    pageCap:
      Number.parseInt(process.env.NEXT_PUBLIC_ADMAVEN_POPUNDER_PAGE_CAP || '4', 10) || 4,
    minuteCap:
      Number.parseInt(process.env.NEXT_PUBLIC_ADMAVEN_POPUNDER_MINUTE_CAP || '10', 10) || 10,
  },
  ab: {
    variant: process.env.NEXT_PUBLIC_AD_VARIANT || 'A',
  },
  slots: {
    // Exemples de slots “banner” pilotés par env (tu colles les URLs officielles par régie).
    headerLeaderboard: {
      width: 728,
      height: 90,
      scriptSrc: process.env.NEXT_PUBLIC_AD_HEADER_LEADERBOARD_SRC || '',
    },
    inContentMediumRect: {
      width: 300,
      height: 250,
      scriptSrc: process.env.NEXT_PUBLIC_AD_INCONTENT_MRECT_SRC || '',
    },
    sidebarHalfPage: {
      width: 300,
      height: 600,
      scriptSrc: process.env.NEXT_PUBLIC_AD_SIDEBAR_HALF_PAGE_SRC || '',
    },
    footerSticky: {
      width: 728,
      height: 90,
      scriptSrc: process.env.NEXT_PUBLIC_AD_FOOTER_STICKY_SRC || '',
    },
  },
} as const

