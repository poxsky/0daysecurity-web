import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const quoteRequests = pgTable(
  "quote_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 254 }).notNull(),
    company: varchar("company", { length: 200 }),
    service: varchar("service", { length: 40 }).notNull(),
    message: text("message").notNull(),
    status: varchar("status", { length: 20 }).default("new").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("quote_requests_email_created_idx").on(table.email, table.createdAt),
    index("quote_requests_status_created_idx").on(table.status, table.createdAt),
    index("quote_requests_created_idx").on(table.createdAt),
  ],
);
