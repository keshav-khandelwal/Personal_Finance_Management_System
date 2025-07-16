import { z } from "zod";
import { Hono } from "hono";
import { and, eq, inArray } from "drizzle-orm";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";

const app = new Hono();

// ✅ GET all accounts for current user
app.get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts)
    .where(eq(accounts.userId, auth.userId));

  return c.json({ data });
});

// ✅ GET account by ID
app.get(
  "/:id",
  zValidator("param", z.object({ id: z.string().optional() })),
  clerkMiddleware(),
  async (c) => {
    const auth = getAuth(c);
    const { id } = c.req.valid("param");

    if (!id) return c.json({ error: "id is required" }, 400);
    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

    const [data] = await db
      .select({ id: accounts.id, name: accounts.name })
      .from(accounts)
      .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)));

    if (!data) return c.json({ error: "Account not found" }, 404);

    return c.json({ data });
  },
);

// ✅ POST create new account (only name)
app.post(
  "/",
  clerkMiddleware(),
  zValidator(
    "json",
    insertAccountSchema.pick({ name: true }) // only expecting `name`
  ),
  async (c) => {
    try {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      console.log("🔐 Auth:", auth);
      console.log("📦 Received Values:", values);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(accounts)
        .values({
          id: createId(),
          userId: auth.userId,
          name: values.name, // only inserting name
          plaidId: null,     // optional — or remove if not needed
        })
        .returning();

      console.log("✅ Account created:", data);

      return c.json({ data });
    } catch (err) {
      console.error("❌ POST /api/accounts failed:", err);
      return c.json({
        error: "Internal Server Error",
        message: err instanceof Error ? err.message : String(err),
      }, 500);
    }
  },
);

// ✅ POST bulk delete
app.post(
  "/bulk-delete",
  clerkMiddleware(),
  zValidator("json", z.object({ ids: z.array(z.string()) })),
  async (c) => {
    const auth = getAuth(c);
    const values = c.req.valid("json");

    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

    const data = await db
      .delete(accounts)
      .where(and(
        eq(accounts.userId, auth.userId),
        inArray(accounts.id, values.ids),
      ))
      .returning({ id: accounts.id });

    return c.json({ data });
  },
);

// ✅ PATCH update account by ID
app.patch(
  "/:id",
  clerkMiddleware(),
  zValidator("param", z.object({ id: z.string().optional() })),
  zValidator("json", insertAccountSchema.pick({ name: true })),
  async (c) => {
    const auth = getAuth(c);
    const { id } = c.req.valid("param");
    const values = c.req.valid("json");

    if (!id) return c.json({ error: "id is required" }, 400);
    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

    const [data] = await db
      .update(accounts)
      .set({ name: values.name })
      .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))
      .returning();

    if (!data) return c.json({ error: "Account not found" }, 404);

    return c.json({ data });
  },
);

// ✅ DELETE account by ID
app.delete(
  "/:id",
  clerkMiddleware(),
  zValidator("param", z.object({ id: z.string().optional() })),
  async (c) => {
    const auth = getAuth(c);
    const { id } = c.req.valid("param");

    if (!id) return c.json({ error: "id is required" }, 400);
    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

    const [data] = await db
      .delete(accounts)
      .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))
      .returning({ id: accounts.id });

    if (!data) return c.json({ error: "Account not found" }, 404);

    return c.json({ data });
  },
);

export default app;
