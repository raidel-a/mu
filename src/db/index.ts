import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { eq, sql } from "drizzle-orm";
import * as schema from "./schema";

if (!process.env.TURSO_CONNECTION_URL) {
  throw new Error("TURSO_CONNECTION_URL is not defined");
}

if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error("TURSO_AUTH_TOKEN is not defined");
}

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

// Helper functions for common database operations
export async function incrementClicks(urlId: string) {
  await db
    .update(schema.shortener)
    .set({
      clicks: sql`clicks + 1`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(schema.shortener.urlId, urlId));
}

export async function createShortUrl(url: string, urlId: string) {
  return db.insert(schema.shortener).values({ url, urlId });
}

export async function getUrlById(urlId: string) {
  return db
    .select()
    .from(schema.shortener)
    .where(eq(schema.shortener.urlId, urlId))
    .get();
}
