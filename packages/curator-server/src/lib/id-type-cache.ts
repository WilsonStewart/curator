import { r } from "@/lib/cache";
import { MtoMS } from "@/lib/converters";
import { db } from "@/lib/db";
import { exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";

export const refreshExhibitIdTypeIdCache = async (): Promise<void> => {
	let doRefresh = false;

	const updatedAt = await r.get("exhibits:idToTypeId--meta");
	if (updatedAt) {
		if (Date.now() - parseInt(updatedAt, 10) > MtoMS(5)) {
			doRefresh = true;
		}
	} else {
		doRefresh = true;
	}

	if (doRefresh) {
		const dbResults = await db
			.select({ id: exhibits.id, exhibitTypeId: exhibits.exhibitTypeId })
			.from(exhibits)
			.execute();

		await r.hset(
			"exhibits:idToTypeId",
			Object.fromEntries(
				dbResults.map(({ id, exhibitTypeId }) => {
					return [id, exhibitTypeId];
				}),
			),
		);

		await r.set("exhibits:idToTypeId--meta", Date.now());
	}
};
