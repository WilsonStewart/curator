import { selectAll } from "@/routes/museums.select-all";
import { selectOne } from "@/routes/museums.select-one";
import { Hono } from "hono";

export const museumsRouter = new Hono()

selectOne(museumsRouter)
selectAll(museumsRouter)