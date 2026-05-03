import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma';
import { CHUNK } from '@/lib/sitemap-config';
import { normalizeUrl } from '@/components/Utils';

export const revalidate = 3600*24; // 1 day

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Base URL du site utilisé pour préfixer toutes les routes
    const urlSite: string = normalizeUrl(process.env.Site_URL || '')
    // Date courante réutilisée pour les routes statiques
    const now = new Date()

    // Récupère le nombre total de vidéos pour construire l'index des sitemaps
    const totalVideos = await prisma.videos.count()
    const numberOfVideoSitemaps = Math.max(1, Math.ceil(totalVideos / CHUNK))
    
    // Récupère la date de la dernière vidéo ajoutée pour lastModified des routes statiques
    const lastVideo = await prisma.videos.findFirst({
        select: {
            createdAt: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    const lastVideoDate = lastVideo?.createdAt || now

    const actorsCountResult = await prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count
        FROM (
            SELECT name
            FROM Actor
            GROUP BY name
            HAVING COUNT(*) >= 3
        ) as actors_with_3_videos
    `
    const totalActors = Number(actorsCountResult[0]?.count ?? 0)
    const numberOfActorSitemaps = Math.max(1, Math.ceil(totalActors / CHUNK))

    const categoriesCountResult = await prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count
        FROM (
            SELECT name
            FROM Categorie
            GROUP BY name
            HAVING COUNT(*) >= 3
        ) as categories_with_3_videos
    `
    const totalCategories = Number(categoriesCountResult[0]?.count ?? 0)
    const numberOfCategorySitemaps = Math.max(1, Math.ceil(totalCategories / CHUNK))

    const channelsCountResult = await prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count
        FROM (
            SELECT name
            FROM Channel
            GROUP BY name
            HAVING COUNT(*) >= 3
        ) as channels_with_3_videos
    `
    const totalChannels = Number(channelsCountResult[0]?.count ?? 0)
    const numberOfChannelSitemaps = Math.max(1, Math.ceil(totalChannels / CHUNK))

    // Routes statiques principales du site
    // Utilise la date de la dernière vidéo pour lastModified (plus précis pour le SEO)
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: urlSite,
            lastModified: lastVideoDate, // Date de la dernière vidéo ajoutée
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: normalizeUrl(urlSite, 'channel'),
            lastModified: lastVideoDate, // Change quand une nouvelle vidéo est ajoutée
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: normalizeUrl(urlSite, 'actor'),
            lastModified: lastVideoDate, // Change quand une nouvelle vidéo est ajoutée
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: normalizeUrl(urlSite, 'categorie'),
            lastModified: lastVideoDate, // Change quand une nouvelle vidéo est ajoutée
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: normalizeUrl(urlSite, 'search'),
            lastModified: now, // Page utilitaire, moins critique
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]

    // Sitemap "fresh" pour les vidéos récentes (priority plus élevée)
    const freshVideoSitemap = {
        url: normalizeUrl(urlSite, 'sitemaps/video-fresh/sitemap.xml'),
        lastModified: lastVideoDate,
        changeFrequency: 'daily' as const,
        priority: 0.5, // Légèrement plus élevé car contenu récent
    }

    const videoSitemaps: MetadataRoute.Sitemap = Array.from(
        { length: numberOfVideoSitemaps },
        (_, i) => ({
            url: normalizeUrl(urlSite, `sitemaps/video/sitemap/${i}.xml`), // Format correspondant à la structure Next.js avec generateSitemaps()
            lastModified: lastVideoDate, // Utilise la date de la dernière vidéo
            changeFrequency: 'daily',
            priority: 0.4,
        })
    )

    const actorSitemaps: MetadataRoute.Sitemap = Array.from(
        { length: numberOfActorSitemaps },
        (_, i) => ({
            url: normalizeUrl(urlSite, `sitemaps/actor/sitemap/${i}.xml`), // Format correspondant à la structure Next.js avec generateSitemaps()
            lastModified: lastVideoDate, // Change quand une nouvelle vidéo avec acteur est ajoutée
            changeFrequency: 'weekly',
            priority: 0.4,
        })
    )

    const categorySitemaps: MetadataRoute.Sitemap = Array.from(
        { length: numberOfCategorySitemaps },
        (_, i) => ({
            url: normalizeUrl(urlSite, `sitemaps/categorie/sitemap/${i}.xml`), // Format correspondant à la structure Next.js avec generateSitemaps()
            lastModified: lastVideoDate, // Change quand une nouvelle vidéo avec catégorie est ajoutée
            changeFrequency: 'weekly',
            priority: 0.4,
        })
    )

    const channelSitemaps: MetadataRoute.Sitemap = Array.from(
        { length: numberOfChannelSitemaps },
        (_, i) => ({
            url: normalizeUrl(urlSite, `sitemaps/channel/sitemap/${i}.xml`), // Format correspondant à la structure Next.js avec generateSitemaps()
            lastModified: lastVideoDate, // Change quand une nouvelle vidéo avec channel est ajoutée
            changeFrequency: 'weekly',
            priority: 0.4,
        })
    )

    return [
        ...staticRoutes,
        freshVideoSitemap, // Sitemap fresh en premier pour prioriser les nouvelles vidéos
        // ...videoSitemaps,
        // ...actorSitemaps,
        // ...categorySitemaps,
        // ...channelSitemaps,
    ]
}