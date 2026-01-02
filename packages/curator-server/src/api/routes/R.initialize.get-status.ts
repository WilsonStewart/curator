// import {
// 	res200Successful,
// 	res401Unauthorized,
// } from "@/lib/describe-route-responses";
// import { LInitializeGetStatus } from "@/logic/initialize/L.initialize.get-status";
// import { Hono } from "hono";
// import { describeRoute } from "hono-openapi";
// import { resolver } from "hono-openapi/zod";
// import { z } from "zod";

// export const RInitializeGetStatus = (app: Hono) => {
// 	app.get(
// 		"/",
// 		describeRoute({
// 			description: "Gets the status of app initialization.",
// 			tags: ["Initialization"],
// 			responses: {
// 				...res200Successful({
// 					zodSchema: z.object({
// 						isInitialized: z.boolean(),
// 						isBuiltinDataClean: z.boolean(),
// 					}),
// 				}),
// 				...res401Unauthorized({}),
// 			},
// 		}),
// 		async (c) => {
// 			let r = await LInitializeGetStatus();
// 			return c.json(r);
// 		},
// 	);
// };
