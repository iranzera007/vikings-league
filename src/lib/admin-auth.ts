import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const adminSessionCookie = "vikings_admin_session";
export const adminSessionMaxAge = 12 * 60 * 60; // 12 hours

function getAdminPassword() {
  const password = process.env.VIKINGS_ADMIN_PASSWORD?.trim();
  if (!password || password.length < 16) {
    throw new Error("Central admin password (VIKINGS_ADMIN_PASSWORD) is not configured (must be at least 16 chars).");
  }
  return password;
}

function safeEqual(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

function sign(value: string) {
  return createHmac("sha256", getAdminPassword()).update(value).digest("hex");
}

export function isAdminPassword(value: string) {
  return safeEqual(value, getAdminPassword());
}

export function createAdminSession() {
  const expiresAt = String(Date.now() + adminSessionMaxAge * 1000);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export async function hasAdminSession() {
  const token = (await cookies()).get(adminSessionCookie)?.value;
  const [expiresAt, signature] = token?.split(".") ?? [];
  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) {
    return false;
  }
  return safeEqual(signature, sign(expiresAt));
}
