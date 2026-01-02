import "dotenv/config";
// import { printBanner } from "@/lib/banner";
import { api } from "./api/api";
import { logger } from "./lib/logger";
// // import env from "@/lib/dotenv";

// import { eq } from "drizzle-orm";
// import { db } from "@/lib/db";
// import { metadata } from "@/schemas/drizzle-schema/drizzle-schema.metadata";
// import { boss } from "@/boss";

function start() {
	// printBanner();

	// // Test db connection, kill if not up
	// try {
	//   await db.select().from(metadata).where(eq(metadata.id, "curatorMetadata"));
	// } catch (error) {
	//   console.error("🛜 Database check query failed!");
	//   console.error("Check connection or check migration to at least 0001!");
	//   console.error(error);
	//   process.exit(1);
	// }

	switch (process.env.CURATOR_MODE) {
		case "api":
			console.log("Starting curator-server in 'api' mode...");
			return Bun.serve({
				port: 5099,
				fetch: api.fetch,
			});

		// case "boss":
		//   boss();
		//   break;

		// case "worker":
		// 	worker();
		// 	break

		default:
			console.log("josiah!");
			break;
	}
}

start();
