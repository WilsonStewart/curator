import env from "@/env";
import { notFound404Handler } from "@/middlewares/404-handler";
import { errorHandler } from "@/middlewares/error-handler";
import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";
import pkgdotjson from "@/../package.json" assert { type: "json" };
import { Scalar } from "@scalar/hono-api-reference";
import { selectOne } from "@/routes/musuems.select-one";

export const api = new Hono();

// api.use(honoLogger);
api.notFound(notFound404Handler);
api.onError(errorHandler);

api.route("/museums", selectOne);

api.get(
  "/openapi.json",
  openAPISpecs(api, {
    documentation: {
      info: {
        title: "Curator Server API",
        version: pkgdotjson.version,
      },
      servers: [
        {
          url: `http://localhost:${env.SERVER_PORT}`,
          description: "Localhost",
        },
      ],
    },
  })
);

api.get(
  "/docs",
  Scalar({
    theme: "elysiajs",
    url: "/openapi.json",
  })
);
