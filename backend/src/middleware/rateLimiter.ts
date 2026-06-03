import rateLimit from "express-rate-limit";

export const rateLimitter = rateLimit({
  windowMs: 60 * 1000,
  max: 5, // 5 requests per minute per IP
  message: {
    error: "Too many messages. Please wait a moment before sending again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
