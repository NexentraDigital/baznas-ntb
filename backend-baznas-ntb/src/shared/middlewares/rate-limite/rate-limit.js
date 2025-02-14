import * as dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { cached as redis } from "../../../configs/redis.js";

dotenv.config();

const middRateLimiter = (time = 60 * 60 * 1000, limit = 30) =>
  rateLimit({
    store: new RedisStore({
      sendCommand: (...arg) => redis.call(...arg),
    }),
    windowMs: time,
    limit: limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    keyGenerator: (req, res) => req.ip,
    passOnStoreError: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    statusCode: 429,
    message: {
      status: "error",
      statusCode: 429,
      message: {
        error: "Opps..terlalu banyak permintaan. Coba lagi nanti",
      },
    },
  });

export default middRateLimiter;
