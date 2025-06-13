import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { api } from "@/api";
import env from "@/env";
import { printBanner } from "@/lib/banner";
import { metadata } from "@/schemas/drizzle-schema";
import { eq } from "drizzle-orm";

export const db = drizzle(env.DATABASE_URL);

const start = async () => {
  printBanner();

  // Test db connection, kill if not up
  try {
    await db.select().from(metadata).where(eq(metadata.id, "curatorMetadata"));
  } catch (error) {
    console.error("🛜 Database check query failed!");
    console.error("Check connection or check migration to at least 0001!");
    console.error(error);
    process.exit(1);
  }

  switch (env.CURATOR_MODE) {
    case "api":
      return {
        port: env.SERVER_PORT,
        fetch: api.fetch,
      };
  }
};

export default await start();
