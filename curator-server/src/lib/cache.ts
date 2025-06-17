import env from "@/dotenv";
import { Redis } from "ioredis"

export const r = new Redis({
    password: env.REDIS_PASSWORD,
});