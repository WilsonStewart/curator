import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound404Handler } from "@/middlewares/404-handler";

export const api = new OpenAPIHono();

api.notFound(notFound404Handler);
