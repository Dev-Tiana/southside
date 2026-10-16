import { boolean, date, decimal, index, int, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const roomCategories = mysqlTable("room_categories", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description"),
  verification: mysqlEnum("verification", ["verified", "provisional", "awaiting approval"]).default("awaiting approval").notNull(),
  maxOccupancy: int("maxOccupancy"),
  bedConfiguration: text("bedConfiguration"),
  amenities: text("amenities"),
  sellableInventory: int("sellableInventory").default(0).notNull(),
  isActive: boolean("isActive").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const roomRates = mysqlTable("room_rates", {
  id: int("id").autoincrement().primaryKey(),
  roomCategoryId: int("roomCategoryId").notNull().references(() => roomCategories.id),
  rateDate: date("rateDate"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("NGN").notNull(),
  isActive: boolean("isActive").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ categoryDate: index("room_rates_category_date").on(table.roomCategoryId, table.rateDate) }));

export const inventoryBlocks = mysqlTable("inventory_blocks", {
  id: int("id").autoincrement().primaryKey(),
  roomCategoryId: int("roomCategoryId").notNull().references(() => roomCategories.id),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  quantity: int("quantity").notNull(),
  reason: varchar("reason", { length: 255 }).notNull(),
  createdBy: int("createdBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ dateIndex: index("inventory_blocks_dates").on(table.roomCategoryId, table.startDate, table.endDate) }));

export const guests = mysqlTable("guests", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const reservations = mysqlTable("reservations", {
  id: int("id").autoincrement().primaryKey(),
  reference: varchar("reference", { length: 24 }).notNull().unique(),
  guestId: int("guestId").notNull().references(() => guests.id),
  roomCategoryId: int("roomCategoryId").notNull().references(() => roomCategories.id),
  checkIn: date("checkIn").notNull(),
  checkOut: date("checkOut").notNull(),
  adults: int("adults").notNull(),
  children: int("children").default(0).notNull(),
  rooms: int("rooms").default(1).notNull(),
  nights: int("nights").notNull(),
  status: mysqlEnum("status", ["draft", "pending payment", "pending manual confirmation", "confirmed", "checked in", "checked out", "cancellation requested", "cancelled", "expired", "payment failed"]).default("pending manual confirmation").notNull(),
  source: mysqlEnum("source", ["website", "staff", "walk in", "telephone", "whatsapp"]).default("website").notNull(),
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 12, scale: 2 }).default("0").notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
  amountPaid: decimal("amountPaid", { precision: 12, scale: 2 }).default("0").notNull(),
  outstanding: decimal("outstanding", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("NGN").notNull(),
  rateSnapshot: text("rateSnapshot").notNull(),
  termsSnapshot: text("termsSnapshot").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({ dateStatus: index("reservations_date_status").on(table.checkIn, table.checkOut, table.status), categoryDates: index("reservations_category_dates").on(table.roomCategoryId, table.checkIn, table.checkOut) }));

export const reservationStatusHistory = mysqlTable("reservation_status_history", {
  id: int("id").autoincrement().primaryKey(),
  reservationId: int("reservationId").notNull().references(() => reservations.id),
  fromStatus: varchar("fromStatus", { length: 40 }),
  toStatus: varchar("toStatus", { length: 40 }).notNull(),
  actorType: varchar("actorType", { length: 40 }).notNull(),
  actorId: int("actorId"),
  note: text("note"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const bookingHolds = mysqlTable("booking_holds", {
  id: int("id").autoincrement().primaryKey(),
  token: varchar("token", { length: 48 }).notNull().unique(),
  roomCategoryId: int("roomCategoryId").notNull().references(() => roomCategories.id),
  checkIn: date("checkIn").notNull(),
  checkOut: date("checkOut").notNull(),
  rooms: int("rooms").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  status: mysqlEnum("status", ["active", "expired", "consumed", "released"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ holdDates: index("booking_holds_dates").on(table.roomCategoryId, table.checkIn, table.checkOut, table.status) }));

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  reservationId: int("reservationId").notNull().references(() => reservations.id),
  provider: varchar("provider", { length: 40 }).notNull(),
  providerReference: varchar("providerReference", { length: 180 }),
  status: mysqlEnum("status", ["initiated", "pending", "paid", "failed", "refunded"]).default("pending").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("NGN").notNull(),
  verifiedAt: timestamp("verifiedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ providerRef: uniqueIndex("payments_provider_reference").on(table.providerReference) }));

export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  enquiryType: varchar("enquiryType", { length: 80 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "in progress", "resolved"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const mediaAssets = mysqlTable("media_assets", {
  id: int("id").autoincrement().primaryKey(),
  assetKey: varchar("assetKey", { length: 255 }).notNull().unique(),
  sourceUrl: text("sourceUrl").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  description: text("description"),
  permissionStatus: mysqlEnum("permissionStatus", ["unresolved", "requested", "approved", "rejected"]).default("unresolved").notNull(),
  ownershipNote: text("ownershipNote"),
  altText: text("altText"),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const hotelSettings = mysqlTable("hotel_settings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 120 }).notNull().unique(),
  settingValue: text("settingValue"),
  verification: mysqlEnum("verification", ["confirmed", "awaiting approval"]).default("awaiting approval").notNull(),
  updatedBy: int("updatedBy"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  actorId: int("actorId"),
  actorType: varchar("actorType", { length: 40 }).notNull(),
  action: varchar("action", { length: 120 }).notNull(),
  entityType: varchar("entityType", { length: 80 }).notNull(),
  entityId: varchar("entityId", { length: 80 }),
  details: text("details"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type RoomCategory = typeof roomCategories.$inferSelect;
export type Reservation = typeof reservations.$inferSelect;
