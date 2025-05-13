import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { api } from "@/api";

export const db = drizzle(process.env.DATABASE_URL!);

switch(process.env.CURATOR_MODE){
    case 'api':
        api()
}