import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi";
import type { Hono, MiddlewareHandler } from "hono";
import { VStatusUnauthenticated } from "@/schemas/validator-schema/v-status";
import { LCalculateUnauthenticatedStatus } from "@/logic/status/L.status.calculate-status";
import { logger } from "@/lib/logger";

export const RStatusGet = (app: Hono) => {
	app.get(
		"/",
		describeRoute({
			description: "Gets the current (non-detailed) status off all components",
			tags: ["Status"],
			responses: {
				200: {
					description: "Successful",
					content: {
						"application/json": {
							schema: resolver(VStatusUnauthenticated),
						},
					},
				},
				503: {
					description: "One or more services are in error",
					content: {
						"application/json": {
							schema: resolver(VStatusUnauthenticated),
						},
					},
				},
			},
		}),
		async (c) => {
			const r = await LCalculateUnauthenticatedStatus();
			logger.info(r);
			if (r.serviceStatus === 0) {
				return c.json(r, 200);
			} else {
				return c.json(r, 503);
			}
		},
	);
};
