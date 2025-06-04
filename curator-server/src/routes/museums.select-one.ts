import { VMuseumSelect } from "@/db/v-schema";
import { LSelectOneMuseum } from "@/logic/museums.select-one";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import z from "zod";
import "zod-openapi/extend";
import { Hono } from "hono";

export const selectOne = (app: Hono) => {
  app.get(
    "/:eid",
    describeRoute({
      description: "Selects a museum resource by its external id (eid).",
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
    validator(
      "param",
      z.object({ eid: z.string().length(8).openapi({ example: "3q9qai4i" }) })
    ),
    async (c) => {
      return c.json(await LSelectOneMuseum(c.req.param("eid")));
    }
  );
};
