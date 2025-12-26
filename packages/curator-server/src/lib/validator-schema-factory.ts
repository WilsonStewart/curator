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
			VInsert?: ZodObject<any>;
			VSelect?: ZodObject<any>;
			VUpdate?: ZodObject<any>;
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
