// import { describeRoute } from "hono-openapi";
// import { Hono } from "hono";
// import {
// 	VExhibitsSelect,
// 	VExhibitsSelectManyQuery,
// } from "@/schemas/validator-schema/v-exhibits";
// import { LExhibitsSelectMany } from "@/logic/exhibits/L.exhibits.select-many";
// import "zod-openapi/extend";
// import {
// 	res200Successful,
// 	res401Unauthorized,
// } from "@/lib/describe-route-responses";
// import { z } from "zod";
// import { validator } from "hono-openapi";

// export const RExhibitsSelectMany = (app: Hono) => {
// 	app.get(
// 		"/",
// 		describeRoute({
// 			description:
// 				"Selects some or all exhibit resources, based upon a query object.",
// 			tags: ["Exhibits"],
// 			responses: {
// 				...res200ok({ zodSchema: z.array(VExhibitsSelect) }),
// 				...res401unauthorized({}),
// 			},
// 		}),
// 		async (c) => {
// 			let r = await LExhibitsSelectMany(
// 				c.req.query() as z.infer<typeof VExhibitsSelectManyQuery>,
// 			);
// 			return c.json(r);
// 		},
// 	);
// };
