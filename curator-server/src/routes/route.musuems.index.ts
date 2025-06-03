import { z } from "zod";
import { Hono } from "hono";
import { validator } from "hono-openapi/zod";
// import { selectOneOapi } from "@/routes/musuems.select-one";

export const musuemsRouter = new Hono();
