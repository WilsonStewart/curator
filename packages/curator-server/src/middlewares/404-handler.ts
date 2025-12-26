import { NotFoundHandler } from "hono";

export const notFound404Handler: NotFoundHandler = (c) => {
	return c.json(
		{
			httpStatusCode: 404,
			message: `404 Not Found: '${c.req.path}'`,
		},
		404,
	);
};
