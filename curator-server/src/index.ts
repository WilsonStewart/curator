import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { api } from "@/api";
import env from "@/env";
import { printBanner } from "@/lib/banner";

export const db = drizzle(env.DATABASE_URL);

const start = () => {
  printBanner();
  switch (env.CURATOR_MODE) {
    case "api":
      return {
        port: env.SERVER_PORT,
        fetch: api.fetch,
      };
  }
};

export default start();
