import { VMuseumIdParam, VMuseumSelect } from "@/schemas/validator-schema";
import { LMuseumsSelectOne } from "@/logic/L.museums.select-one";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import z from "zod";
import "zod-openapi/extend";
import { Hono } from "hono";
import { VExhibitsIdParam, VExhibitsSelect } from "@/schemas/validator-schema/v-exhibits";
import { LExhibitsSelectOne } from "@/logic/L.exhibits.select-one";

export const RExhibitsSelectOne = (app: Hono) => {
    app.get(
        "/:id",
        describeRoute({
            description: "Selects a exhibit resource by its id.",
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
            return c.status(200)
        }
    );
};
