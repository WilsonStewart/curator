import env from "@/lib/dotenv";
import { createMiddleware } from "hono/factory";

export const honoLogger = createMiddleware(async (c, next) => {
	const logLine = {
		timestamp: new Date().toISOString(),
		url: c.req.url,
		method: c.req.method,
		response: c.res.status,
	};

	env.NODE_ENV === "production"
		? console.log(JSON.stringify(logLine))
		: console.log(JSON.stringify(logLine, null, 2));

	next();
});
