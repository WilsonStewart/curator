import env from "@/lib/dotenv";
import { notFound404Handler } from "@/middlewares/404-handler";
import { errorHandler } from "@/middlewares/error-handler";
import { openAPIRouteHandler } from "hono-openapi";
import rootPkgDotJson from "@/../../../package.json" with { type: "json" };
import { Scalar } from "@scalar/hono-api-reference";
import { museumsRouter, statusRouter } from "@/api/routes";
import { auth, authEnabledHono } from "@/lib/auth";
import { authenticatedRoute } from "@/middlewares/auth-middleware";
import { logger } from "@/lib/logger";
import { pinoLogger } from "hono-pino";
import { Hono } from "hono";
// import { RStatusGet } from "./api/routes/status/R.status.get";

export const API_BASE_URL = "/api/v1";

export const api = authEnabledHono();
api.use(
	pinoLogger({
		pino: logger,
	}),
);

// const protectedApi = authEnabledHono();

// api.use(logger());
// api.use(honoLogger);
api.notFound(notFound404Handler);
api.onError(errorHandler);
// api.use("*", cors());
api.on(["GET", "POST"], `${API_BASE_URL}/auth/*`, (c) =>
	auth.handler(c.req.raw),
);

api.route(`${API_BASE_URL}/status`, statusRouter);
// api.route(`${API_BASE_URL}/museums`, museumsRouter);
// api.route("/api/initialize", initializeRouter);
// api.route("/api/exhibits", exhibitsRouter);

// protectedApi.use("*", authenticatedRoute);

api.get(
	`${API_BASE_URL}/openapi.json`,
	openAPIRouteHandler(api, {
		documentation: {
			info: {
				title: "Curator Server API",
				version: rootPkgDotJson.version
			},
			servers: [
				{
					url: `${env.SERVER_URL}:${env.SERVER_PORT}`,
				},
			],
		},
	}),
);

api.get(
	`${API_BASE_URL}/docs`,
	Scalar({
		theme: "elysiajs",
		layout: "modern",
		sources: [
			{ url: "/api/v1/openapi.json", title: "Api" },
			{ url: "/api/v1/auth/open-api/generate-schema", title: "Auth" },
		],
		defaultHttpClient: {
			clientKey: "fetch",
			targetKey: "js",
		},
	}),
);

// protectedApi.route("/museums", museumsRouter);
// protectedApi.route("/initialize", initializeRouter);

// api.route("/", protectedApi);

// console.log(
// 	`Api started for real at ${env.SERVER_URL}:${env.SERVER_PORT}/api/v1`,
// );
