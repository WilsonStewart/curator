import { res200Successful, res401Unauthorized } from "@/lib/describe-route-responses"
import { knownTypeIds } from "@/lib/known-resources"
import { LMuseumsUpdateOne } from "@/logic/L.museums.update-one"
import { VMuseumIdParam, VMuseumSelect, VMuseumUpdate } from "@/schemas/validator-schema"
import { VExhibitsIdTypeIdParam, VExhibitsSelect, VExhibitsUpdate } from "@/schemas/validator-schema/v-exhibits"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver, validator } from "hono-openapi/zod"
import z from "zod"

export const RExhibitsUpdateOne = (app: Hono) => {
    app.patch(
        "/:id",
        describeRoute({
            description: "Updates a exhibit resource by its id.",
            tags: ["Exhibits"],
            responses: {
                ...res200Successful({ zodSchema: VExhibitsSelect }),
                ...res401Unauthorized({}),
            }
        }),
        validator("param", VExhibitsIdTypeIdParam.openapi({ example: { id: "01JXMVE4F6VRRJ6ZM37S721DH4", exhibitTypeId: knownTypeIds.exhibits.byTableName.etd_youtube_channel } })),
        validator("json", VMuseumUpdate),
        async (c) => {
            let r = await LMuseumsUpdateOne(c.req.param("id"), await c.req.json())

            return c.json(r)
        }
    )
}

