import rateLimit from 'express-rate-limit'

export const formRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP, please try again after a minute',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      retry_after: Math.ceil((req as any)?.rateLimit?.resetTime - Date.now() / 1000)
    })
  }
})