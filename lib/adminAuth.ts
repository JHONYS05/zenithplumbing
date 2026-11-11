/**
 * Simple password login for /admin.
 *  ADMIN_PASSWORD        the password (required — the admin is disabled without it)
 *  ADMIN_SESSION_SECRET  optional extra secret for signing the login cookie
 */
import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "zenith_admin";
const SESSION_DAYS = 7;

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

function secret() {
  return process.env.ADMIN_SESSION_SECRET || `zenith:${process.env.ADMIN_PASSWORD ?? ""}`;
}

function sign(value: string) {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function passwordMatches(input: string) {
  const pw = process.env.ADMIN_PASSWORD;
  return Boolean(pw) && safeEqual(input, pw!);
}

export async function startSession() {
  const expires = Date.now() + SESSION_DAYS * 864e5;
  const token = `${expires}.${sign(String(expires))}`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && process.env.ADMIN_INSECURE_COOKIE !== "1",
    sameSite: "lax",
    path: "/",
    expires: new Date(expires),
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  return safeEqual(sig, sign(expires));
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
