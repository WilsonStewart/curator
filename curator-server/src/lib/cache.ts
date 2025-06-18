import env from "@/dotenv";
import { Redis } from "ioredis"

export const r = new Redis({
    password: env.REDIS_PASSWORD,
});

export const lazyRedisHash = async (
    opts: {
        key: string
        field: string
        asyncLoader: () => Promise<string>
    }
): Promise<string | undefined> => {
    let result = await r.hget(opts.key, opts.field)
    if (!result) {
        let loadedValue = await opts.asyncLoader()
        await r.hset(opts.key, opts.field, loadedValue)
        let result = await r.hget(opts.key, opts.field)
    }
    if (result) { return result }
}