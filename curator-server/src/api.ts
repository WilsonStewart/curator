import env from "@/env";
import { notFound404Handler } from "@/middlewares/404-handler";
import { errorHandler } from "@/middlewares/error-handler";
import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";
import pkgdotjson from "@/../package.json" assert { type: "json" };
import { Scalar } from "@scalar/hono-api-reference";
import { honoLogger } from "@/middlewares/hono-logger";
import { museumsRouter } from "@/routes/routes";
import { cors } from "hono/cors";
import { auth } from "@/lib/auth";
import { authenticatedRoute } from "@/middlewares/auth-middleware";

export const api = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null
  }
}>();

const protectedApi = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null
  }
}>();


// api.use(honoLogger);
api.notFound(notFound404Handler);
api.onError(errorHandler);
api.use("*", cors());
api.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

protectedApi.use("*", authenticatedRoute)

protectedApi.get(
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
protectedApi.get(
  "/docs",
  Scalar({
    theme: "elysiajs",
    url: "/openapi.json",
    layout: "modern",
    defaultHttpClient: {
      clientKey: "fetch",
      targetKey: "js",
    },
  })
);
protectedApi.route("/museums", museumsRouter);

api.route("/", protectedApi)