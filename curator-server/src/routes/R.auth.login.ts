import { VExhibitsIdParam, VExhibitsSelect } from "@/schemas/validator-schema/v-exhibits";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod"
import z from "zod";

export const RExhibitsSelectOne = (app: Hono) => {
    app.get(
        "/:id",
        describeRoute({
            description: "Selects an exhibit resource by its id.",
            tags: ["Exhibits"],
            responses: {
                200: {
                    description: "Successful",
                    content: {
                        "application/json": {
                            schema: resolver(z.array(VExhibitsSelect).length(1)),
                        },
                    },
                },
            },
        }),
        validator(
            "param",
            VExhibitsIdParam.openapi({ example: { id: "01JXJYQXH6A9GXPJF5V50Q1WES" } })
        ),
        async (c) => {
            let r = await LExhibitsSelectOne(c.req.param("id"))

            if (r) {
                return c.json(r, 200)
            }
            else {
                return c.status(500)
            }
        }
    );
};