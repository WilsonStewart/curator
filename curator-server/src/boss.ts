import { db } from "@/lib/db"
import { repositories, rt_localFilesystem } from "@/schemas/drizzle-schema/drizzle-schema.repositories"
import { eq } from "drizzle-orm";

export const boss = async () => {
    let boss = new Boss()
    await boss.init()
}

class Boss {
    async init() {
        await this.validateRepositories()
    }

    async validateRepositories() {
        let repos = await db
            .select()
            .from(repositories)
            .leftJoin(rt_localFilesystem, eq(repositories.id, rt_localFilesystem.repositoryId))
            .execute()

        repos.forEach(async (repo) => {
            console.log(repo.repositories.id)
        })
    }
}