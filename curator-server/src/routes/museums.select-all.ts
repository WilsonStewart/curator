import { VMuseumSelect } from "@/db/v-schema";
import { LSelectAllMuseums } from "@/logic/museums.select-all";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import z from "zod";
import "zod-openapi/extend"
import { Hono } from "hono";

export const selectAll = (app: Hono) => {
    app.get(
        "/:eid",
        describeRoute({
            description: "Selects a museum by its external id (eid).",
            tags: ["Museums"],
            responses: {
                200: {
                    description: "Successful",
                    content: {
                        "application/json": { schema: resolver(z.array(VMuseumSelect)) },
                    },
                },
            },
        }),
        async (c) => {
            return c.json(await LSelectAllMuseums(c.req.param('eid')))
        }
    );
}
