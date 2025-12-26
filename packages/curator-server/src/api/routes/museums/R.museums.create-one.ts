import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import z from "zod";
import "zod-openapi/extend";
import { Hono } from "hono";
import { LMuseumsCreateOne } from "@/logic/museums/L.museums.create-one";
import { VMuseumInsert, VMuseumSelect } from "@/schemas/validator-schema";

export const RMuseumsCreateOne = (app: Hono) => {
	app.post(
		"/",
		describeRoute({
			description: "Creates a museum resource.",
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
			},
		}),
		validator("json", VMuseumInsert),
		async (c) => {
			let r = await LMuseumsCreateOne(await c.req.json());
			return c.json(r, 200);
		},
	);
};
