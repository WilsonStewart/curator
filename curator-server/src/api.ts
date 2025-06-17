import env from "@/dotenv";
import { notFound404Handler } from "@/middlewares/404-handler";
import { errorHandler } from "@/middlewares/error-handler";
import { openAPISpecs } from "hono-openapi";
import pkgdotjson from "@/../package.json" assert { type: "json" };
import { Scalar } from "@scalar/hono-api-reference";
import { honoLogger } from "@/middlewares/hono-logger";
import { initializeRouter, museumsRouter } from "@/routes/routes";
import { cors } from "hono/cors";
import { auth, authHono } from "@/lib/auth";
import { authenticatedRoute } from "@/middlewares/auth-middleware";
import { logger } from "hono/logger";

export const api = authHono();

const protectedApi = authHono();

api.use(logger());
// api.use(honoLogger);
api.notFound(notFound404Handler);
api.onError(errorHandler);
api.use("*", cors());
api.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

api.route("/api/initialize", initializeRouter);

protectedApi.use("*", authenticatedRoute);

api.get(
  "/api/openapi.json",
  openAPISpecs(api, {
    documentation: {
      info: {
        title: "Curator Server API",
        version: pkgdotjson.version,
      },
      servers: [
        {
          url: `http://localhost:${env.SERVER_PORT}`,
          description: "development",
        },
        {
          url: `http://localhost:80`,
          description: "production",
        },
      ],
    },
  })
);
api.get(
  "/api/docs",
  Scalar({
    theme: "elysiajs",
    url: "/api/openapi.json",
    layout: "modern",
    defaultHttpClient: {
      clientKey: "fetch",
      targetKey: "js",
    },
  })
);
protectedApi.route("/museums", museumsRouter);
protectedApi.route("/initialize", initializeRouter);

api.route("/api/", protectedApi);
