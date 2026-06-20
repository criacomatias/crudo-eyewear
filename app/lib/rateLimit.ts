type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

interface RateLimitOptions {
  limit: number
  windowMs: number
}

export function rateLimit(key: string, options: RateLimitOptions): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs })
    return { ok: true, retryAfter: 0 }
  }

  if (bucket.count >= options.limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  bucket.count += 1
  return { ok: true, retryAfter: 0 }
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}