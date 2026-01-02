import { type AnyPgTable } from "drizzle-orm/pg-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import z, { ZodObject, type ZodRawShape, ZodString } from "zod";

type NonEmptyifyShape<T extends ZodRawShape> = {
	[K in keyof T]: T[K] extends ZodString
		? ReturnType<ZodString["nonempty"]>
		: T[K];
};

function makeZStringsNonempty<T extends ZodRawShape>(
	shape: T,
): ZodObject<NonEmptyifyShape<T>> {
	const result = {} as NonEmptyifyShape<T>;

	for (const key in shape) {
		const field = shape[key];
		result[key] = (
			field instanceof ZodString ? field.nonempty() : field
		) as NonEmptyifyShape<T>[typeof key];
	}

	return z.object(result);
}

export function validatorSchemaFactory<TTable extends AnyPgTable>(
	table: TTable,
	options?: {
		additionalFieldsToOmit?: {
			insert?: string[];
		};
		doMakeStringsNotemptyOnInsert?: boolean;
		VSchemaOverride?: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			VInsert?: ZodObject<any>;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			VSelect?: ZodObject<any>;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			VUpdate?: ZodObject<any>;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			VDelete?: ZodObject<any>;
		};
	},
) {
	const baseInsert =
		options?.VSchemaOverride?.VInsert ?? createInsertSchema(table);
	const baseSelect =
		options?.VSchemaOverride?.VSelect ?? createSelectSchema(table);
	const baseUpdate =
		options?.VSchemaOverride?.VUpdate ?? createUpdateSchema(table);
	const baseDelete =
		options?.VSchemaOverride?.VDelete ?? z.object({ id: z.string() });

	const fieldsToOmitInsert = options?.additionalFieldsToOmit?.insert
		? [
				"id",
				"createdAt",
				"modifiedAt",
				// biome-ignore lint/correctness/noUnsafeOptionalChaining: <explanation>
				...options?.additionalFieldsToOmit?.insert,
		  ]
		: ["id", "createdAt", "modifiedAt"];

	const insertShape = options?.doMakeStringsNotemptyOnInsert
		? makeZStringsNonempty(baseInsert.shape)
		: baseInsert.shape;
	const selectShape = baseSelect.shape;
	const updateShape = baseUpdate.shape;
	const deleteShape = baseDelete.shape;

	const VInsert = z.object(
		fieldsToOmitInsert
			? Object.fromEntries(
					Object.entries(insertShape).filter(
						([key]) => !fieldsToOmitInsert.includes(key),
					),
			  )
			: insertShape,
	);
	const VSelect = z.object(selectShape);
	const VUpdate = z.object(updateShape);
	const VDelete = z.object(deleteShape);

	return {
		VInsert,
		VSelect,
		VUpdate,
		VDelete,
	};
}
