import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound404Handler } from "@/middlewares/404-handler";
import { errorHandler } from "@/middlewares/error-handler";
import { honoLogger } from "@/middlewares/hono-logger";

export const api = new OpenAPIHono();

api.use(honoLogger);
api.notFound(notFound404Handler);
api.onError(errorHandler);
