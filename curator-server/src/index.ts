import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { api } from "@/api";

export const db = drizzle(process.env.DATABASE_URL!);

const start = () => {
  switch (process.env.CURATOR_MODE) {
    case "api":
      return {
        port: process.env.PORT,
        fetch: api.fetch,
      };
  }
};

export default start();
