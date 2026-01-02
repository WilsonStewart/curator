// import { db } from "@/lib/db";
// import { knownTypeIds, type TExhibitTypeId } from "@/lib/known-resources";
// import {
// 	et_youtubeChannels,
// 	exhibits,
// } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
// import { VExhibitsUpdate } from "@/schemas/validator-schema/v-exhibits";
// import { eq } from "drizzle-orm";
// import { z } from "zod";

// export const LExhibitsUpdateOne = async (opts: {
// 	id: string;
// 	exhibitTypeId: TExhibitTypeId;
// 	body: z.infer<typeof VExhibitsUpdate>;
// }) => {
// 	let TDTable = knownTypeIds.exhibits.byId[opts.exhibitTypeId].table;

// 	// if (opts.body.data || opts.body.typeData) {
// 	// 	let dataToSubmit = {
// 	// 		data: opts.body.data ?? {},
// 	// 		typeData: opts.body.typeData ?? undefined,
// 	// 	};

// 	// 	dataToSubmit.data.updatedAt =
// 	// 		dataToSubmit.data.updatedAt ?? new Date().toISOString();

// 	// 	let r = await db.transaction(async (tx) => {
// 	// 		const [dataResult] = await tx
// 	// 			.update(exhibits)
// 	// 			.set(dataToSubmit.data)
// 	// 			.where(eq(exhibits.id, opts.id))
// 	// 			.returning()
// 	// 			.execute();

// 	// 		const typeDataResult = dataToSubmit.typeData
// 	// 			? (
// 	// 					await tx
// 	// 						.update(TDTable)
// 	// 						.set(dataToSubmit.typeData)
// 	// 						.where(eq(TDTable.exhibitId, opts.id))
// 	// 						.returning()
// 	// 						.execute()
// 	// 				)[0]
// 	// 			: (
// 	// 					await tx
// 	// 						.select()
// 	// 						.from(TDTable)
// 	// 						.where(eq(TDTable.exhibitId, opts.id))
// 	// 						.execute()
// 	// 				)[0];

// 	// 		return {
// 	// 			data: dataResult,
// 	// 			typeData: typeDataResult,
// 	// 		};
// 	// 	});

// 	// 	return r;
// 	// } else {
// 	// 	return { message: "nothing" };
// 	// }
// };
