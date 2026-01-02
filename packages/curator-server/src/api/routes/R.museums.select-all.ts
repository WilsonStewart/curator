// import { VMuseumSelect } from "@/schemas/validator-schema";
// import { LMuseumsSelectAll } from "@/logic/museums/L.museums.select-all";
// import { describeRoute } from "hono-openapi";
// import { resolver } from "hono-openapi/zod";
// import z from "zod";
// import "zod-openapi/extend";
// import { Hono } from "hono";

// export const RMuseumsSelectAll = (app: Hono) => {
// 	app.get(
// 		"/",
// 		describeRoute({
// 			description: "Selects all museum resources.",
// 			tags: ["Museums"],
// 			responses: {
// 				200: {
// 					description: "Successful",
// 					content: {
// 						"application/json": { schema: resolver(z.array(VMuseumSelect)) },
// 					},
// 				},
// 			},
// 		}),
// 		async (c) => {
// 			let r = await LMuseumsSelectAll();
// 			return c.json(r, 200);
// 		},
// 	);
// };
