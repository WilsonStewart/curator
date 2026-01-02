// import env from "@/lib/dotenv";
// import { type TExhibitTypeId } from "@/lib/known-resources";
// import { Redis } from "ioredis";

// export const r = new Redis({
// 	password: env.REDIS_PASSWORD,
// });

// export type TLazyRedisHashOpts = {
// 	key: string;
// 	field: string;
// 	asyncLoader: () => Promise<string>;
// };

// export const lazyRedisHash = async (
// 	opts: TLazyRedisHashOpts,
// ): Promise<string | undefined> => {
// 	let result = await r.hget(opts.key, opts.field);
// 	if (!result) {
// 		let loadedValue = await opts.asyncLoader();
// 		await r.hset(opts.key, opts.field, loadedValue);
// 		let result = await r.hget(opts.key, opts.field);
// 	}
// 	if (result) {
// 		return result;
// 	}
// };

// export const typeIdLookup = async (
// 	opts: TLazyRedisHashOpts,
// ): Promise<TExhibitTypeId | undefined> => {
// 	let result = await lazyRedisHash(opts);
// 	if (result) {
// 		return <TExhibitTypeId>result;
// 	}
// };
