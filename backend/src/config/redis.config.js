import { createClient } from "redis";

export const redis = createClient({
  username: "default",
  password: "cUqe0b7ZQn619tcW4WNwUrTKnQ69ZbKH",
  socket: {
    host: "redis-10176.crce179.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 10176,
  },
});

redis.on("error", (err) => console.error("❌ Redis Error:", err));
redis.on("connect", () => console.log("✅ Connected to Redis Cloud"));

await redis.connect();
