import env from "@/env";
import { ErrorHandler } from "hono";

export const errorHandler: ErrorHandler = (err, c) => {
  return c.json({
    message: err.message,
    httpStatusCode: c.status,
    stack: env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
