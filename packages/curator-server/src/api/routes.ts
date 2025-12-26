// import { RExhibitsSelectMany } from "@/routes/exhibits/R.exhibits.select-many";
// import { RExhibitsSelectOne } from "@/routes/exhibits/R.exhibits.select-one";
// import { RExhibitsUpdateOne } from "@/routes/exhibits/R.exhibits.update-one";
// import { RInitializeGetStatus } from "@/routes/initialize/R.initialize.get-status";
import { RMuseumsCreateOne } from "@/routes/museums/R.museums.create-one";
import { RMuseumsSelectAll } from "@/routes/museums/R.museums.select-all";
import { RMuseumsSelectOne } from "@/routes/museums/R.museums.select-one";
import { RMuseumsUpdateOne } from "@/routes/museums/R.museums.update-one";
import { RMuseumsDeleteOne } from "@/routes/museums/R.musuems.delete-one";
import { Hono } from "hono";
import { RStatusGet } from "@/api/routes/status/R.status.get";

export const statusRouter = new Hono();
export const museumsRouter = new Hono();
// export const initializeRouter = new Hono();
// export const exhibitsRouter = new Hono();

RStatusGet(statusRouter);

// RMuseumsCreateOne(museumsRouter);
// RMuseumsSelectAll(museumsRouter);
// RMuseumsSelectOne(museumsRouter);
// RMuseumsUpdateOne(museumsRouter);
// RMuseumsDeleteOne(museumsRouter);

// RInitializeGetStatus(initializeRouter);

// RExhibitsSelectOne(exhibitsRouter);
// RExhibitsSelectMany(exhibitsRouter);
// RExhibitsUpdateOne(exhibitsRouter);
