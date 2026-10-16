import crypto from "node:crypto";

export type PaystackConfig = { enabled: boolean; publicKey?: string };

export function getPaystackConfig(): PaystackConfig {
  const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  return { enabled: Boolean(publicKey && secretKey && process.env.PAYSTACK_WEBHOOK_SECRET), publicKey };
}

export async function initializePaystackTransaction(input: { email: string; amountNaira: number; reference: string; callbackUrl: string }) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) throw new Error("Paystack payment is not configured");
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email: input.email, amount: Math.round(input.amountNaira * 100), currency: "NGN", reference: input.reference, callback_url: input.callbackUrl }),
  });
  if (!response.ok) throw new Error("Paystack transaction could not be initialized");
  return response.json() as Promise<{ status: boolean; data?: { authorization_url?: string; reference?: string } }>;
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) throw new Error("Paystack payment is not configured");
  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, { headers: { Authorization: `Bearer ${secretKey}` } });
  if (!response.ok) throw new Error("Paystack transaction could not be verified");
  return response.json() as Promise<{ status: boolean; data?: { status?: string; amount?: number; currency?: string; reference?: string } }>;
}

export function verifyPaystackWebhook(rawBody: Buffer, signature: string | undefined) {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  const received = Buffer.from(signature, "utf8");
  const computed = Buffer.from(expected, "utf8");
  return received.length === computed.length && crypto.timingSafeEqual(received, computed);
}
