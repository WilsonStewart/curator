import { RInitializeGetStatus } from "@/routes/R.initialize.get-status";
import { RMuseumsCreateOne } from "@/routes/R.museums.create-one";
import { RMuseumsSelectAll } from "@/routes/R.museums.select-all";
import { RMuseumsSelectOne } from "@/routes/R.museums.select-one";
import { RMuseumsUpdateOne } from "@/routes/R.museums.update-one";
import { RMuseumsDeleteOne } from "@/routes/R.musuems.delete-one";
import { Hono } from "hono";

export const museumsRouter = new Hono();
export const initializeRouter = new Hono();

RMuseumsCreateOne(museumsRouter);
RMuseumsSelectAll(museumsRouter);
RMuseumsSelectOne(museumsRouter);
RMuseumsUpdateOne(museumsRouter);
RMuseumsDeleteOne(museumsRouter);

RInitializeGetStatus(initializeRouter);
