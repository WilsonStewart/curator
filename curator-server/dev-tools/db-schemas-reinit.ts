import { db } from "@/lib/db"
import { sql } from "drizzle-orm"

const dbSchemasReinit = async () => {
    await db.execute(sql`drop schema PUBLIC cascade;`)
    await db.execute(sql`drop schema DRIZZLE cascade;`)
    await db.execute(sql`create schema PUBLIC;`)
}

dbSchemasReinit()