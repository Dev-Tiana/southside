import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { getPaystackConfig, initializePaystackTransaction, verifyPaystackWebhook } from "../payments/paystack";

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.post("/api/paystack/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const signature = req.header("x-paystack-signature");
    const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body ?? "");
    if (!verifyPaystackWebhook(rawBody, signature)) return res.status(401).json({ error: "Invalid webhook signature" });
    try {
      const event = JSON.parse(rawBody.toString("utf8")) as { event?: string };
      console.info("[Paystack] Accepted webhook event", event.event ?? "unknown");
      return res.sendStatus(200);
    } catch {
      return res.status(400).json({ error: "Invalid webhook payload" });
    }
  });
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  app.post("/api/paystack/initialize", async (req, res) => {
    const config = getPaystackConfig();
    if (!config.enabled) return res.status(503).json({ error: "Payment processing is not configured" });
    const { email, amountNaira, reference } = req.body ?? {};
    if (typeof email !== "string" || typeof amountNaira !== "number" || typeof reference !== "string") return res.status(400).json({ error: "Invalid payment request" });
    try {
      const callbackUrl = process.env.PAYSTACK_CALLBACK_URL;
      if (!callbackUrl) return res.status(503).json({ error: "Payment callback is not configured" });
      const result = await initializePaystackTransaction({ email, amountNaira, reference, callbackUrl });
      return res.json(result);
    } catch (error) {
      return res.status(502).json({ error: error instanceof Error ? error.message : "Payment provider error" });
    }
  });
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

startServer().catch(error => { console.error(error); process.exit(1); });
