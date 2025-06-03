import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { api } from "@/api";
import env from "@/env";
import pkgdotjson from "@/../package.json" assert { type: "json" };
import { apiFiglet } from "@/lib/figlets";

const printFiglet = () => {
  switch (env.CURATOR_MODE) {
    case "api":
      console.log(apiFiglet);
  }
  console.log(`Started at:         ${new Date()}`);
  console.log(`Package name:       ${pkgdotjson.name}`);
  console.log(`Version:            ${pkgdotjson.version}`);
  console.log(`NODE_ENV:           ${env.NODE_ENV}`);
  console.log(`CURATOR_MODE:       ${env.CURATOR_MODE}`);
  if (env.CURATOR_MODE === "api") {
    console.log(
      `OpenAPI endpoint:   http://localhost:${env.SERVER_PORT}/openapi.json`
    );
    console.log(`Scaler endpoint:    http://localhost:${env.SERVER_PORT}/docs`);
  }
  console.log("");
};

export const db = drizzle(env.DATABASE_URL);

const start = () => {
  printFiglet();
  switch (env.CURATOR_MODE) {
    case "api":
      return {
        port: env.SERVER_PORT,
        fetch: api.fetch,
      };
  }
};

export default start();
