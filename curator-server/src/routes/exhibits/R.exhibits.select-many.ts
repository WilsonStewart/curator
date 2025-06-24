import { describeRoute } from "hono-openapi";
import { Hono } from "hono";
import { VExhibitsSelect } from "@/schemas/validator-schema/v-exhibits";
import { LExhibitsSelectAll } from "@/logic/exhibits/L.exhibits.select-all";
import "zod-openapi/extend";
import {
  res200Successful,
  res401Unauthorized,
} from "@/lib/describe-route-responses";
import { z } from "zod";

export const RExhibitsSelectMany = (app: Hono) => {
  app.get(
    "/",
    describeRoute({
      description:
        "Selects some or all exhibit resources, based upon a query object.",
      tags: ["Exhibits"],
      responses: {
        ...res200Successful({ zodSchema: z.array(VExhibitsSelect) }),
        ...res401Unauthorized({}),
      },
    }),
    async (c) => {
      let r = await LExhibitsSelectAll();
      return c.json(r);
    }
  );
};
