import { createClient } from "redis";
import connectRedis from "connect-redis";
import session from "express-session";

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));

const RedisStore = connectRedis(session);

export { RedisStore, redisClient };
