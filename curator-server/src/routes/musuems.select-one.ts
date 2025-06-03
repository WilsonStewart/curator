import { VMuseumSelect } from "@/db/v-schema";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import z from "zod";

export const selectOne = new Hono();

selectOne.get(
  "/:eid",
  describeRoute({
    description: "Gets a museum by its external id (eid).",
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
  (c) => {
    return c.text("a museum");
  }
);
