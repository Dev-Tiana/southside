import { and, desc, eq, lt, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { nanoid } from "nanoid";
import { InsertUser, User, bookingHolds, contactSubmissions, guests, inventoryBlocks, reservations, roomCategories, roomRates, reservationStatusHistory, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); }
    catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) { values[field] = user[field] ?? null; updateSet[field] = user[field] ?? null; }
  }
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined || user.openId === ENV.ownerOpenId) { values.role = user.role ?? "admin"; updateSet.role = values.role; }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string): Promise<User | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return rows[0];
}

export async function listRoomCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(roomCategories).where(eq(roomCategories.isActive, true)).orderBy(roomCategories.id);
}

function toDate(value: string) { return new Date(`${value}T00:00:00.000Z`); }
function dateDiff(checkIn: string, checkOut: string) { return Math.max(0, Math.round((toDate(checkOut).getTime() - toDate(checkIn).getTime()) / 86400000)); }
function gtDate(column: any, value: any) { return sql`${column} > ${value}`; }

export async function searchAvailability(input: { checkIn: string; checkOut: string; adults: number; children: number; rooms: number; roomSlug?: string }) {
  const db = await getDb();
  if (!db) return { configured: false, nights: dateDiff(input.checkIn, input.checkOut), rooms: [] as Array<unknown> };
  const checkIn = toDate(input.checkIn);
  const checkOut = toDate(input.checkOut);
  const categories = await db.select().from(roomCategories).where(and(eq(roomCategories.isActive, true), input.roomSlug ? eq(roomCategories.slug, input.roomSlug) : sql`1 = 1`));
  const now = new Date();
  const results = [] as Array<Record<string, unknown>>;
  for (const category of categories) {
    const overlapping = await db.select({ rooms: sql<number>`coalesce(sum(${reservations.rooms}), 0)` }).from(reservations).where(and(eq(reservations.roomCategoryId, category.id), lt(reservations.checkIn, checkOut), gtDate(reservations.checkOut, checkIn), or(eq(reservations.status, "confirmed"), eq(reservations.status, "pending manual confirmation"), eq(reservations.status, "pending payment"), eq(reservations.status, "checked in"))));
    const holds = await db.select({ rooms: sql<number>`coalesce(sum(${bookingHolds.rooms}), 0)` }).from(bookingHolds).where(and(eq(bookingHolds.roomCategoryId, category.id), eq(bookingHolds.status, "active"), gtDate(bookingHolds.expiresAt, now), lt(bookingHolds.checkIn, checkOut), gtDate(bookingHolds.checkOut, checkIn)));
    const blocks = await db.select({ rooms: sql<number>`coalesce(sum(${inventoryBlocks.quantity}), 0)` }).from(inventoryBlocks).where(and(eq(inventoryBlocks.roomCategoryId, category.id), lt(inventoryBlocks.startDate, checkOut), gtDate(inventoryBlocks.endDate, checkIn)));
    const used = Number(overlapping[0]?.rooms ?? 0) + Number(holds[0]?.rooms ?? 0) + Number(blocks[0]?.rooms ?? 0);
    const available = Math.max(0, category.sellableInventory - used);
    if (available < input.rooms) continue;
    const nightly = await db.select().from(roomRates).where(and(eq(roomRates.roomCategoryId, category.id), eq(roomRates.isActive, true), or(eq(roomRates.rateDate, checkIn), sql`${roomRates.rateDate} is null`))).orderBy(roomRates.rateDate).limit(1);
    const rate = nightly[0]?.amount ? Number(nightly[0].amount) : 0;
    results.push({ slug: category.slug, name: category.name, available, nightlyRate: rate, nights: dateDiff(input.checkIn, input.checkOut), total: rate * dateDiff(input.checkIn, input.checkOut) * input.rooms, verification: category.verification });
  }
  return { configured: true, nights: dateDiff(input.checkIn, input.checkOut), rooms: results };
}

export async function createReservation(input: { name: string; email: string; phone: string; roomCategoryId: number; checkIn: string; checkOut: string; adults: number; children: number; rooms: number; subtotal: number; total: number; rateSnapshot: string; termsSnapshot: string; }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const reference = `SS${nanoid(10).toUpperCase()}`;
  const nights = dateDiff(input.checkIn, input.checkOut);
  const checkIn = toDate(input.checkIn);
  const checkOut = toDate(input.checkOut);
  return db.transaction(async tx => {
    const [category] = await tx.select().from(roomCategories).where(eq(roomCategories.id, input.roomCategoryId)).limit(1);
    if (!category || !category.isActive || category.sellableInventory < input.rooms) throw new Error("Room category is not configured for online booking");
    const conflicts = await tx.select({ rooms: sql<number>`coalesce(sum(${reservations.rooms}), 0)` }).from(reservations).where(and(eq(reservations.roomCategoryId, input.roomCategoryId), lt(reservations.checkIn, checkOut), gtDate(reservations.checkOut, checkIn), or(eq(reservations.status, "confirmed"), eq(reservations.status, "pending manual confirmation"), eq(reservations.status, "pending payment"), eq(reservations.status, "checked in"))));
    if (Number(conflicts[0]?.rooms ?? 0) + input.rooms > category.sellableInventory) throw new Error("The selected inventory changed. Search again before submitting.");
    const guestResult = await tx.insert(guests).values({ name: input.name, email: input.email, phone: input.phone });
    const guestId = Number(guestResult[0].insertId);
    const reservationResult = await tx.insert(reservations).values({ reference, guestId, roomCategoryId: input.roomCategoryId, checkIn, checkOut, adults: input.adults, children: input.children, rooms: input.rooms, nights, status: "pending manual confirmation", source: "website", subtotal: String(input.subtotal), tax: "0", total: String(input.total), amountPaid: "0", outstanding: String(input.total), currency: "NGN", rateSnapshot: input.rateSnapshot, termsSnapshot: input.termsSnapshot });
    const reservationId = Number(reservationResult[0].insertId);
    await tx.insert(reservationStatusHistory).values({ reservationId, fromStatus: null, toStatus: "pending manual confirmation", actorType: "guest", note: "Created from public reservation enquiry" });
    return { reference, reservationId, status: "pending manual confirmation" as const };
  });
}

export async function createContactSubmission(input: { name: string; email: string; phone?: string; enquiryType: string; message: string; }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.insert(contactSubmissions).values(input);
  return { id: Number(result[0].insertId) };
}

export async function getAdminSummary() {
  const db = await getDb();
  if (!db) return { configured: false, arrivals: 0, departures: 0, pending: 0, confirmed: 0, categories: 0, reservations: [] as Array<unknown> };
  const today = toDate(new Date().toISOString().slice(0, 10));
  const [arrivals, departures, pending, confirmed, categories, recent] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(reservations).where(and(eq(reservations.checkIn, today), or(eq(reservations.status, "confirmed"), eq(reservations.status, "pending manual confirmation")))),
    db.select({ count: sql<number>`count(*)` }).from(reservations).where(and(eq(reservations.checkOut, today), or(eq(reservations.status, "confirmed"), eq(reservations.status, "checked in")))),
    db.select({ count: sql<number>`count(*)` }).from(reservations).where(or(eq(reservations.status, "pending manual confirmation"), eq(reservations.status, "pending payment"))),
    db.select({ count: sql<number>`count(*)` }).from(reservations).where(eq(reservations.status, "confirmed")),
    db.select({ count: sql<number>`count(*)` }).from(roomCategories).where(eq(roomCategories.isActive, true)),
    db.select({ reference: reservations.reference, checkIn: reservations.checkIn, checkOut: reservations.checkOut, status: reservations.status, total: reservations.total, createdAt: reservations.createdAt }).from(reservations).orderBy(desc(reservations.createdAt)).limit(10),
  ]);
  return { configured: true, arrivals: Number(arrivals[0]?.count ?? 0), departures: Number(departures[0]?.count ?? 0), pending: Number(pending[0]?.count ?? 0), confirmed: Number(confirmed[0]?.count ?? 0), categories: Number(categories[0]?.count ?? 0), reservations: recent };
}
