import "dotenv/config";
import { Client } from "pg";
import { writeFile } from "fs/promises";
import readline from "readline";

export async function confirmDestructiveActionTwice(
  firstWarningText: string,
  secondWarningConfirmationText: string
): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (q: string) =>
    new Promise<string>((resolve) => rl.question(q, (a) => resolve(a.trim())));

  try {
    const first = await ask(
      `\n⚠️ ${firstWarningText}\n` +
      "Are you 100% sure?: "
    );

    if (first.toLowerCase() !== "y" && first.toLowerCase() !== "yes") {
      throw new Error("Aborted: first confirmation failed.");
    }

    const second = await ask(
      "\n🚨 FINAL CONFIRMATION 🚨\n" +
      `To confirm, type:\n${secondWarningConfirmationText}\n>`
    );

    if (second !== secondWarningConfirmationText) {
      throw new Error("Aborted: second confirmation failed.");
    }
  } finally {
    rl.close();
  }
}


async function createAndConnectDbClient(): Promise<Client>{
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  await client.connect();

  return client
}

export async function updateLatestDrizzleMigrationHash(){
  const client = await createAndConnectDbClient()

  try {
    const result = await client.query<{
      hash: string;
    }>(`
      SELECT hash
      FROM drizzle.__drizzle_migrations
      ORDER BY id DESC
      LIMIT 1
    `);

    if (result.rowCount === 0) {
      throw new Error("No migrations found in drizzle.__drizzle_migrations");
    }

    await writeFile(
      "precheck/latest-drizzle-migration-hash.precheck.ts",
      `export const latestDrizzleMigrationHash = "${result.rows[0]!.hash}"`,
      "utf8"
    );

    console.log(`${result.rows[0]!.hash}`)
  } finally {
    await client.end()
  }
}

export async function nukeDbAndReset(){

  await confirmDestructiveActionTwice(
    "You are about to drop the entire DB and reset it!",
    "MURDER_DB"
  )

  const client = await createAndConnectDbClient()

  try {
    await client.query<{
      hash: string;
    }>(`
      DROP SCHEMA IF EXISTS public CASCADE;
      DROP SCHEMA IF EXISTS drizzle CASCADE;
      CREATE SCHEMA public;
    `);

    console.log(`db reset 🙃`)
  } finally {
    await client.end()
  }
}

const cmd = process.argv[2];

switch (cmd) {
  case "updateLatestDrizzleMigrationHash":
    await updateLatestDrizzleMigrationHash();
    break;
  case "nukeDbAndReset":
    await nukeDbAndReset();
    break;
  default:
    console.error("Usage: bun run tools.ts <updateLatestDrizzleMigrationHash|nukeDbAndReset>");
    process.exit(1);
}