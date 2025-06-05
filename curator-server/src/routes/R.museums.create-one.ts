import { VMuseumCreate, VMuseumSelect } from "@/db/v-schema";
import { LSelectOneMuseum } from "@/logic/L.museums.select-one";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import z from "zod";
import "zod-openapi/extend";
import { Hono } from "hono";
import { LCreateOneMuseum } from "@/logic/L.museums.create-one";

export const createOne = (app: Hono) => {
  app.post(
    "/",
    describeRoute({
      description: "Creates a museum resource.",
      tags: ["Museums"],
      responses: {
        200: {
          description: "Successful",
          content: {
            "application/json": {
              schema: resolver(z.array(VMuseumCreate).length(1)),
            },
          },
        },
      },
    }),
    validator(
      "json",
      VMuseumCreate.omit({ eid: true, createdAt: true, modifiedAt: true })
    ),
    async (c) => {
      return c.json(await LCreateOneMuseum(await c.req.json()));
    }
  );
};
