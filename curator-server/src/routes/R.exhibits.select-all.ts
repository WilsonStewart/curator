import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { Hono } from "hono";
import { VExhibitsSelectAll } from "@/schemas/validator-schema/v-exhibits";
import { LExhibitsSelectAll } from "@/logic/L.exhibits.select-all";
import "zod-openapi/extend";

export const RExhibitsSelectAll = (app: Hono) => {
    app.get(
        "/",
        describeRoute({
            description: "Selects all exhibit resource.",
            tags: ["Exhibits"],
            responses: {
                200: {
                    description: "Successful",
                    content: {
                        "application/json": {
                            schema: resolver(VExhibitsSelectAll),
                        },
                    },
                },
            },
        }),
        async (c) => {
            let r = await LExhibitsSelectAll()
            return c.json(r)
        }
    );
};
