// import { VMuseumIdParam, VMuseumSelect } from "@/schemas/validator-schema";
// import { LMuseumsSelectOne } from "@/logic/museums/L.museums.select-one";
// import { describeRoute } from "hono-openapi";
// import { resolver, validator } from "hono-openapi/zod";
// import z from "zod";
// import "zod-openapi/extend";
// import { Hono } from "hono";

// export const RMuseumsSelectOne = (app: Hono) => {
// 	app.get(
// 		"/:id",
// 		describeRoute({
// 			description: "Selects a museum resource by its id.",
// 			tags: ["Museums"],
// 			responses: {
// 				200: {
// 					description: "Successful",
// 					content: {
// 						"application/json": {
// 							schema: resolver(z.array(VMuseumSelect).length(1)),
// 						},
// 					},
// 				},
// 			},
// 		}),
// 		validator(
// 			"param",
// 			VMuseumIdParam.openapi({ example: { id: "01JXJYQXH6A9GXPJF5V50Q1WES" } }),
// 		),
// 		async (c) => {
// 			let r = await LMuseumsSelectOne(c.req.param("id"));
// 			return c.json(r, 200);
// 		},
// 	);
// };
