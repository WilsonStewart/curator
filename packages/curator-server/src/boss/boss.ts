// import { db } from "@/lib/db";
// import { existsDir, mkDir } from "@/lib/fs-utils";
// import { knownTypeIds } from "@/lib/known-resources";
// import {
// 	repositories,
// 	rt_localFilesystem,
// } from "@/schemas/drizzle-schema/drizzle-schema.repositories";
// import { eq } from "drizzle-orm";

// export const boss = async () => {
// 	let boss = new Boss();
// 	await boss.init();
// };

// class Boss {
// 	async init() {
// 		await this.startRepositories();
// 	}

// 	async startRepositories() {
// 		console.log("Ensuring repositories...");

// 		const repos = await db
// 			.select()
// 			.from(repositories)
// 			.leftJoin(
// 				rt_localFilesystem,
// 				eq(repositories.id, rt_localFilesystem.repositoryId),
// 			)
// 			.execute();

// 		console.log(
// 			`Found ${repos.length} ${
// 				repos.length === 1 ? "repository" : "repositories"
// 			}.`,
// 		);

// 		repos.forEach(async (repo) => {
// 			switch (repo.repositories.repositoryTypeId) {
// 				case knownTypeIds.repositories.byTableName.rt_local_filesystem:
// 					if (await existsDir(repo.rt_local_filesystem!.path)) {
// 						console.log(
// 							` -  ${repo.repositories.id} (${repo.repositories.name}): Path '${
// 								repo.rt_local_filesystem!.path
// 							}' already exists.`,
// 						);
// 					} else {
// 						console.log(
// 							` -  ${repo.repositories.id} (${
// 								repo.repositories.name
// 							}): Created path '${repo.rt_local_filesystem!.path}'.`,
// 						);
// 						await mkDir(repo.rt_local_filesystem!.path);
// 					}
// 			}
// 		});

// 		// repos.forEach(async (repo) => {
// 		// 	switch (repo.repositories.role) {
// 		// 		case "ingest":
// 		// 			chokidar
// 		// 				.watch("/curator/repositories/ingest")
// 		// 				.on("add", async (path) => {});
// 		// 	}
// 		// });
// 	}

// 	async addItemToIngestQueue() {}
// }
