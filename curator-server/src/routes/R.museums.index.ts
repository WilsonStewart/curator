import { selectAll } from "@/routes/R.museums.select-all";
import { selectOne } from "@/routes/R.museums.select-one";
import { deleteOne } from "@/routes/R.musuems.delete-one";
import { Hono } from "hono";

export const museumsRouter = new Hono()

selectOne(museumsRouter)
selectAll(museumsRouter)
deleteOne(museumsRouter)