import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const adminPath = "/admin/inscricoes";
export const adminSessionCookie = "registration_admin";
export const adminSessionMaxAge = 12 * 60 * 60;

export type Registration = {
  id: string;
  created_at: string;
  idempotency_key: string;
  name: string;
  game_id: string;
  instagram: string;
  whatsapp: string;
  shirt_size: string | null;
  shirt_number: number | null;
  position_1: string;
  position_2: string;
  position_3: string;
  photo_object_path: string | null;
  payment_status?: string | null; // Pendente, Confirmado, Cancelado
};

function getAdminPassword() {
  const password = process.env.REGISTRATION_ADMIN_PASSWORD?.trim();
  if (!password || password.length < 16) {
    throw new Error("Registration admin password is not configured (must be at least 16 chars).");
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

export async function listRegistrations() {
  const { data, error } = await createSupabaseAdmin()
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Registrations query failed");
  }
  return data as Registration[];
}

export async function getPhotoSignedUrl(path: string | null) {
  if (!path) return null;
  const bucket = process.env.SUPABASE_REGISTRATION_PHOTOS_BUCKET ?? "registration-photos";
  const { data } = await createSupabaseAdmin().storage.from(bucket).createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}
