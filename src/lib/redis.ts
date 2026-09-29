import { Redis } from '@upstash/redis';

// Upstash REST client for serverless functions (Vercel)
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});
