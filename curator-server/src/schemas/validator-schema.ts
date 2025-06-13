// import { museums } from "@/schemas/drizzle-schema";
// import { validatorSchemaFactory } from "@/lib/validator-schema-factory";

// import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { VOwnerKVs, VTimestampKVs } from "@/schemas/validator.common-schema";
import z from "zod";
import { protectedResouces } from "@/lib/protected-resources"

// export const VMuseumSelect = createSelectSchema(museums);
// export const VMuseumInsert = createInsertSchema(museums)
//   .omit({ id: true, createdAt: true, modifiedAt: true })
//   .extend({
//     displayName: z
//       .string()
//       .nonempty({ message: "displayName cannot be empty" }),
//   }).shape;

// export const VMuseum = validatorSchemaFactory(museums);

export const VMuseumSelect = z.object({
  id: z.string().ulid().nonempty(),
  displayName: z.string().nonempty(),
  ...VOwnerKVs,
  ...VTimestampKVs,
})

export const VMuseumInsert = VMuseumSelect.omit({
  id: true,
  createdAt: true,
  modifiedAt: true
})

export const VMuseumUpdate = VMuseumInsert.partial().omit({
  createdBy: true
})

export const VMuseumIdParam = z.object({ id: z.string().ulid().nonempty() })

export const VMuseumDelete = z.object({
  id: z.string().ulid().nonempty()
}).superRefine((data, c) => {

  let foundInProtectedResources = protectedResouces.fromDelete.museums.find(
    (i) => i.id === data.id
  )

  if (foundInProtectedResources) {
    c.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['id'],
      message: foundInProtectedResources.reason
    })
  }
})