// import {
// 	res200Successful,
// 	res401Unauthorized,
// } from "@/lib/describe-route-responses";
// import { knownTypeIds, TExhibitTypeId } from "@/lib/known-resources";
// import { LExhibitsUpdateOne } from "@/logic/exhibits/L.exhibits.update-one";
// import {
// 	VExhibitsIdTypeIdParam,
// 	VExhibitsSelect,
// 	VExhibitsUpdate,
// } from "@/schemas/validator-schema/v-exhibits";
// import { Hono } from "hono";
// import { describeRoute } from "hono-openapi";
// import { validator } from "hono-openapi/zod";

// export const RExhibitsUpdateOne = (app: Hono) => {
// 	app.patch(
// 		"/:exhibitTypeId/:id",
// 		describeRoute({
// 			description: "Updates a exhibit resource by its id.",
// 			tags: ["Exhibits"],
// 			responses: {
// 				...res200Successful({ zodSchema: VExhibitsSelect }),
// 				...res401Unauthorized({}),
// 			},
// 		}),
// 		validator(
// 			"param",
// 			VExhibitsIdTypeIdParam.openapi({
// 				example: {
// 					id: "01JXMVE4F6VRRJ6ZM37S721DH4",
// 					exhibitTypeId: knownTypeIds.exhibits.byTableName.et_youtube_channel,
// 				},
// 			}),
// 		),
// 		validator("json", VExhibitsUpdate),
// 		async (c) => {
// 			let r = await LExhibitsUpdateOne({
// 				id: c.req.param("id"),
// 				exhibitTypeId: c.req.param("exhibitTypeId")! as TExhibitTypeId,
// 				body: await c.req.json(),
// 			});

// 			return c.json(r);
// 		},
// 	);
// };
