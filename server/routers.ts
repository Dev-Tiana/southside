import { z } from "zod";
import { hotelProfile, provisionalRooms } from "@shared/hotel";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createContactSubmission, createReservation, getAdminSummary, getDb, listRoomCategories, searchAvailability } from "./db";
import { roomCategories } from "../drizzle/schema";

const dateString = z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/, "Use a valid date");

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  hotel: router({
    profile: publicProcedure.query(() => hotelProfile),
    rooms: publicProcedure.query(async () => {
      const rows = await listRoomCategories();
      if (rows.length > 0) return rows;
      return provisionalRooms.map((room, index) => ({ id: index + 1, slug: room.slug, name: room.name, description: room.description, verification: room.verification, maxOccupancy: null, bedConfiguration: null, amenities: JSON.stringify(room.amenities), sellableInventory: 0, isActive: false }));
    }),
  }),
  booking: router({
    search: publicProcedure.input(z.object({ checkIn: dateString, checkOut: dateString, adults: z.number().int().min(1).max(12), children: z.number().int().min(0).max(12), rooms: z.number().int().min(1).max(5), roomSlug: z.string().optional() })).mutation(async ({ input }) => {
      const start = new Date(`${input.checkIn}T00:00:00Z`);
      const end = new Date(`${input.checkOut}T00:00:00Z`);
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) throw new Error("Check out must be later than check in.");
      if (start < today) throw new Error("Please choose a future check in date.");
      return searchAvailability(input);
    }),
    submit: publicProcedure.input(z.object({ name: z.string().min(2).max(160), email: z.string().email(), phone: z.string().min(7).max(40), roomCategoryId: z.number().int().positive(), checkIn: dateString, checkOut: dateString, adults: z.number().int().min(1).max(12), children: z.number().int().min(0).max(12), rooms: z.number().int().min(1).max(5), subtotal: z.number().nonnegative(), total: z.number().nonnegative(), rateSnapshot: z.string().min(1), termsSnapshot: z.string().min(1) })).mutation(async ({ input }) => createReservation(input)),
    changeRequest: publicProcedure.input(z.object({ reference: z.string().min(4).max(80), email: z.string().email(), requestType: z.enum(["Cancellation request", "Modification request"]), message: z.string().min(10).max(4000), privacyAccepted: z.literal(true) })).mutation(async ({ input }) => {
      const result = await createContactSubmission({ name: `Reservation ${input.reference}`, email: input.email, enquiryType: input.requestType, message: `Reference: ${input.reference}\n\n${input.message}` });
      return { ...result, accepted: true };
    }),
  }),
  contact: router({
    submit: publicProcedure.input(z.object({ name: z.string().min(2).max(160), email: z.string().email(), phone: z.string().max(40).optional(), enquiryType: z.string().min(2).max(80), message: z.string().min(10).max(4000), privacyAccepted: z.literal(true) })).mutation(async ({ input }) => {
      const result = await createContactSubmission(input);
      return { ...result, accepted: true };
    }),
  }),
  admin: router({
    summary: adminProcedure.query(() => getAdminSummary()),
    currentUser: protectedProcedure.query(({ ctx }) => ({ id: ctx.user.id, name: ctx.user.name, email: ctx.user.email, role: ctx.user.role })),
    roomDrafts: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return provisionalRooms;
      return db.select().from(roomCategories).orderBy(roomCategories.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
