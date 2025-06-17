import { VExhibitsInsert } from "@/schemas/validator-schema/v-exhibits";
import { z } from "zod";

export const LExhibitsSelectOne = (id: string, typeId?: string): z.infer<typeof VExhibitsInsert> => {

}