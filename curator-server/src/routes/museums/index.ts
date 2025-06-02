import { VMuseumSelect } from "@/db/v-schema";
import { type } from "arktype";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/arktype"

export const musuemsRoute = new Hono();

musuemsRoute.get("/:eid",
    describeRoute({
        description: "Gets a museum by its external id (eid).",
        responses: {
            200: {
                description: "Successful",
                content: {
                    "application/json": { schema: resolver(VMuseumSelect) }
                }
            }
        }
    }),
    validator("query", type({ eid: "string" })),
    (c) => {
        return c.json({ ok: true })
    }
)