import { VMuseumSelect } from "@/db/v-schema";
import { LSelectAllMuseums } from "@/logic/logic.musuems.select-all";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import z from "zod";

export const RSelectAllMuseum = new Hono().get(
    "/:eid",
    describeRoute({
        description: "Selects a museum by its external id (eid).",
        tags: ["Museums"],
        responses: {
            200: {
                description: "Successful",
                content: {
                    "application/json": { schema: resolver(VMuseumSelect) },
                },
            },
        },
    }),
    validator("param", z.object({ eid: z.string() })),
    async (c) => {
        return c.json(await LSelectAllMuseums(c.req.param('eid')))
    }
);