import { VStatusUnauthenticated } from "../../schemas/validator/v-status";
import type { Hono } from "hono";
import { describeRoute, resolver } from "hono-openapi";
import z from "zod";
import { LCalculateUnauthenticatedStatus } from "../logic/L.status.calculate-status";

export const RStatusGet = (app: Hono) => {
	app.get(
		"/",
		describeRoute({
			description: "Gets the status of app initialization.",
			tags: ["Initialization"],
			responses: {
				200: {
					description: "Successful",
					content: {
						"application/json": {
							schema: resolver(z.array(VStatusUnauthenticated)),
						},
					},
				},
			},
		}),
		async (c) => {
			let r = await LCalculateUnauthenticatedStatus();
			return c.json(r);
		},
	);
};
