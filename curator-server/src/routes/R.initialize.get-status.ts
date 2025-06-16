import { LInitializeGetStatus } from "@/logic/L.initialize.get-status";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from "zod";

export const RInitializeGetStatus = (app: Hono) => {
  app.get(
    "/",
    describeRoute({
      description: "Gets the status of app initialization.",
      tags: ["Initialization"],
      responses: {
        200: {
          description: "Successful",
          content: {
            "application/json": {
              schema: resolver(
                z.object({
                  isInitialized: z.boolean(),
                  isBuiltinDataClean: z.boolean(),
                })
              ),
            },
          },
        },
      },
    }),
    async (c) => {
      let r = await LInitializeGetStatus();
      return c.json(r);
    }
  );
};
