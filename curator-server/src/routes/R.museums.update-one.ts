import { LMuseumsUpdateOne } from "@/logic/L.museums.update-one"
import { VMuseumIdParam, VMuseumSelect, VMuseumUpdate } from "@/schemas/validator-schema"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver, validator } from "hono-openapi/zod"
import z from "zod"

export const RMuseumsUpdateOne = (app: Hono) => {
    app.patch(
        "/:id",
        describeRoute({
            description: "Updates a museum resource by its id.",
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
        validator("param", VMuseumIdParam.openapi({ example: { id: "01JXMVE4F6VRRJ6ZM37S721DH4" } })),
        validator("json", VMuseumUpdate),
        async (c) => {
            let r = await LMuseumsUpdateOne(c.req.param("id"), await c.req.json())
            return c.json(r)
        }
    )
}