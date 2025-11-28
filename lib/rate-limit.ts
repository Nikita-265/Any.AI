import { db } from './db';

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: Date;
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowSeconds * 1000);

  try {
    // Clean up expired rate limits
    await db.rateLimit.deleteMany({
      where: {
        expiresAt: { lt: now },
      },
    });

    // Get or create rate limit record
    const rateLimit = await db.rateLimit.findUnique({
      where: { key },
    });

    if (!rateLimit || rateLimit.expiresAt < now) {
      // Create new rate limit
      await db.rateLimit.upsert({
        where: { key },
        create: {
          key,
          count: 1,
          expiresAt: new Date(now.getTime() + windowSeconds * 1000),
        },
        update: {
          count: 1,
          expiresAt: new Date(now.getTime() + windowSeconds * 1000),
        },
      });

      return {
        success: true,
        remaining: limit - 1,
        reset: new Date(now.getTime() + windowSeconds * 1000),
      };
    }

    if (rateLimit.count >= limit) {
      return {
        success: false,
        remaining: 0,
        reset: rateLimit.expiresAt,
      };
    }

    // Increment count
    await db.rateLimit.update({
      where: { key },
      data: { count: { increment: 1 } },
    });

    return {
      success: true,
      remaining: limit - rateLimit.count - 1,
      reset: rateLimit.expiresAt,
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    // Allow request on error to avoid blocking legitimate users
    return {
      success: true,
      remaining: limit,
      reset: new Date(now.getTime() + windowSeconds * 1000),
    };
  }
}

