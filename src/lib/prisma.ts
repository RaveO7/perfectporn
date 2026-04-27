import { PrismaClient } from '@prisma/client'

/**
 * Singleton Prisma Client pour éviter les connexions multiples
 * Configuration optimisée pour la production
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma