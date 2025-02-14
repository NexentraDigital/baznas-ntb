import Redis from "ioredis";
import * as dotenv from "dotenv";

dotenv.config();

const redisOptions = process.env.REDIS_URL
  ? process.env.REDIS_URL
  : {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASS,
      tls: process.env.REDIS_TLS_SSL ? {} : undefined,
      db: process.env.REDIS_DB || null,
    };

const cached = new Redis(redisOptions);
cached.on("error", (err) => {
  console.log("Redis error", err.message);
});
export { cached };
