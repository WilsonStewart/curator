import { VMuseumSelect } from "@/db/v-schema";
import { LSelectOneMuseum } from "@/logic/logic.musuems.select-one";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import z from "zod";

export const RSelectOneMuseum = new Hono().get(
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
    let result = await LSelectOneMuseum(c.req.param('eid'))
    return c.text(typeof result)
  }
);
