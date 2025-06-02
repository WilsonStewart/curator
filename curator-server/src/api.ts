import { notFound404Handler } from "@/middlewares/404-handler";
import { errorHandler } from "@/middlewares/error-handler";
import { honoLogger } from "@/middlewares/hono-logger";
import { musuemsRoute } from "@/routes/museums";
import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";

export const api = new Hono();

api.use(honoLogger);
api.notFound(notFound404Handler);
api.onError(errorHandler);

api.route("/museums", musuemsRoute)

api.use("/openapi.json", openAPISpecs(api, {}))