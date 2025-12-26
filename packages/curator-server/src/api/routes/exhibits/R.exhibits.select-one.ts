import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi";
import { Hono } from "hono";
import {
	VExhibitsIdTypeIdParam,
	VExhibitsSelect,
} from "@/schemas/validator-schema/v-exhibits";
import { LExhibitsSelectOne } from "@/logic/exhibits/L.exhibits.select-one";
import { TExhibitTypeId } from "@/lib/known-resources";
import "zod-openapi/extend";
import {
	res200Successful,
	res401Unauthorized,
} from "@/lib/describe-route-responses";

export const RExhibitsSelectOne = (app: Hono) => {
	app.get(
		"/:exhibitTypeId/:id",
		describeRoute({
			description: "Selects a exhibit resource by its id.",
			tags: ["Exhibits"],
			responses: {
				...res200Successful({ zodSchema: VExhibitsSelect }),
				...res401Unauthorized({}),
			},
		}),
		validator(
			"param",
			VExhibitsIdTypeIdParam.openapi({
				example: {
					id: "01JXJXZJCREM9Q5W9XX3WB1CF",
					exhibitTypeId: "01JXJXZJCREM9Q5W9XX3WB1C13",
				},
			}),
		),
		async (c) => {
			let r = await LExhibitsSelectOne(
				c.req.param("id"),
				c.req.param("exhibitTypeId") as TExhibitTypeId,
			);
			return c.json(r);
		},
	);
};
