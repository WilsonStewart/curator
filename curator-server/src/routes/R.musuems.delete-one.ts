import { VMuseumSelect } from "@/db/v-schema";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import z from "zod";
import "zod-openapi/extend";
import { Hono } from "hono";
import { LDeleteOneMuseum } from "@/logic/L.museums.delete-one"

export const deleteOne = (app: Hono) => {
    app.delete(
        "/:eid",
        describeRoute({
            description: "Removes a museum resource by its external id (eid).",
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
        validator(
            "param",
            z.object(
                { eid: z.string().length(8).openapi({ example: "frKxit2y" }) })
        ),
        async (c) => {
            return c.json(await LDeleteOneMuseum(c.req.param("eid")))
        }
    )
};
