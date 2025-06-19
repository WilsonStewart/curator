import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { Hono } from "hono";
import { VExhibitsIdTypeIdParam, VExhibitsSelectOne } from "@/schemas/validator-schema/v-exhibits";
import { LExhibitsSelectOne } from "@/logic/L.exhibits.select-one";
import { TExhibitTypeId } from "@/lib/known-resources";
import "zod-openapi/extend";

export const RExhibitsSelectOne = (app: Hono) => {
    app.get(
        "/:exhibitTypeId/:id",
        describeRoute({
            description: "Selects a exhibit resource by its id.",
            tags: ["Exhibits"],
            responses: {
                200: {
                    description: "Successful",
                    content: {
                        "application/json": {
                            schema: resolver(VExhibitsSelectOne),
                        },
                    },
                },
            },
        }),
        validator("param", VExhibitsIdTypeIdParam.openapi({ example: { id: "01JXJXZJCREM9Q5W9XX3WB1CF", exhibitTypeId: "01JXJXZJCREM9Q5W9XX3WB1C13" } })),
        async (c) => {
            let r = await LExhibitsSelectOne(c.req.param("id"), c.req.param("exhibitTypeId") as TExhibitTypeId)
            return c.json(r)
        }
    );
};
