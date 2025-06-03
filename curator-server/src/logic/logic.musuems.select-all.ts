import { museums, users } from "@/db/schema"
import { db } from "@/index"
import { eq } from "drizzle-orm"

export const LSelectAllMuseums = async (eid: string) => {
    // console.log("bob")
    return await db.select().from(museums).execute()
}