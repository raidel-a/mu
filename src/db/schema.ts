import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const shortener = sqliteTable("shortener", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  urlId: text("urlId").notNull().unique(),
  clicks: integer("clicks").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
