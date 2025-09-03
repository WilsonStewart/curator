import "dotenv/config";
import { api } from "@/api";
import env from "@/dotenv";
import { printBanner } from "@/lib/banner";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { metadata } from "@/schemas/drizzle-schema/drizzle-schema.metadata";
import { refreshExhibitIdTypeIdCache } from "@/lib/id-type-cache";
import { boss } from "@/boss";

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

    case "super":
      boss()
  }
};

export default await start();
