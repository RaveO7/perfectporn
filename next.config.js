/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
            },
            {
                protocol: 'http',
                hostname: '**',
                port: '',
            }
        ],
        // deviceSizes : correspond aux largeurs de viewport (breakpoints Tailwind)
        deviceSizes: [375, 640, 768, 1024, 1280, 1920],
        // imageSizes : correspond aux largeurs d'images générées (doit être < deviceSizes)
        // Calculées selon votre grid : 1 col (375px), 2 cols (384px), 3 cols (341px), 4 cols (320px)
        // + marges pour les écrans Retina (2x)
        imageSizes: [320, 384, 400, 450, 500, 640, 750, 828],
        minimumCacheTTL: 60,
    },
    eslint: { ignoreDuringBuilds: true, },
    // Compression et optimisation
    compress: true,
    poweredByHeader: false,
    // Optimisations pour réduire les requêtes de blocage de l'affichage
    swcMinify: true, // Utilise SWC pour la minification (plus rapide que Terser)
    // Optimisation du CSS : Next.js minifie déjà le CSS par défaut en production
    // Le CSS critique est automatiquement inliné dans Next.js 14

    async headers() {
        // CSP optionnelle (à activer via ADS_CSP_ENABLED=1)
        // Les scripts publicitaires changent souvent de domaines/CDN: commence large, puis resserre.
        if (process.env.ADS_CSP_ENABLED !== '1') return []

        const csp = [
            "default-src 'self'",
            // Beaucoup de régies utilisent des snippets inline; retire 'unsafe-inline' si ton setup n'en a pas besoin.
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:",
            "img-src 'self' data: https: http:",
            "style-src 'self' 'unsafe-inline' https: http:",
            "connect-src 'self' https: http: wss:",
            "frame-src 'self' https: http:",
            "font-src 'self' data: https: http:",
            "base-uri 'self'",
        ].join('; ')

        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'Content-Security-Policy', value: csp },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
        ]
    },
}

module.exports = nextConfig
