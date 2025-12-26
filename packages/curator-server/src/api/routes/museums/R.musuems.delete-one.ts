import {
	VMuseumDelete,
	VMuseumIdParam,
	VMuseumSelect,
} from "@/schemas/validator-schema";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import z from "zod";
import "zod-openapi/extend";
import { Hono } from "hono";
import { LMuseumsDeleteOne } from "@/logic/museums/L.museums.delete-one";

export const RMuseumsDeleteOne = (app: Hono) => {
	app.delete(
		"/:id",
		describeRoute({
			description: "Removes a museum resource by its id.",
			tags: ["Museums"],
			responses: {
				200: {
					description: "Successful",
					content: {
						"application/json": {
							schema: resolver(z.array(VMuseumSelect).length(1)),
						},
					},
				},
				404: {
					description: "Not Found",
					content: {
						"application/json": {
							schema: resolver(z.array(z.unknown()).length(0)),
						},
					},
				},
			},
		}),
		validator(
			"param",
			VMuseumDelete.openapi({ example: { id: "01JXMVE4F6VRRJ6ZM37S721DH4" } }),
		),
		async (c) => {
			let r = await LMuseumsDeleteOne(c.req.param("id"));
			if (r.length < 1) {
				c.status(404);
			}
			return c.json(r);
		},
	);
};
