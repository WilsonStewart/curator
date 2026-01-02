import { auth } from "../../lib/auth";
import { createMiddleware } from "hono/factory";

export const authenticatedRoute = createMiddleware(async (c, next) => {
	// Extract the session from the incoming request headers
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	// If no valid session or user is found, return an unauthorized response
	if (!session || !session.user) {
		return c.json(
			{
				success: false,
				message: "Unauthorized",
				error: "No valid session found",
			},
			401,
		);
	}

	console.log(session.user);

	c.set("user", session.user);
	c.set("session", session.session);

	await next();
});
