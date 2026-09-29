"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminPath,
  listRegistrations,
  getPhotoSignedUrl,
  isAdminPassword, // kept for backward compat if used
} from "@/lib/registration-admin";
import { hasAdminSession, createAdminSession, adminSessionMaxAge, adminSessionCookie } from "@/lib/admin-auth";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";



export async function deleteRegistrationAction(id: string) {
  if (!(await hasAdminSession())) {
    throw new Error("Unauthorized");
  }

  const supabase = createSupabaseAdmin();
  
  // First fetch the registration to get the photo_object_path
  const { data: reg, error: fetchError } = await supabase
    .from("registrations")
    .select("photo_object_path")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error("Failed to fetch registration for deletion");
  }

  // Delete the row
  const { error: deleteError } = await supabase
    .from("registrations")
    .delete()
    .eq("id", id);

  if (deleteError) {
    throw new Error("Failed to delete registration");
  }

  // Delete the photo if it exists
  if (reg?.photo_object_path) {
    const bucket = process.env.SUPABASE_REGISTRATION_PHOTOS_BUCKET ?? "registration-photos";
    await supabase.storage.from(bucket).remove([reg.photo_object_path]);
  }

  revalidatePath(adminPath);
}

export async function confirmRegistrationAction(id: string) {
  if (!(await hasAdminSession())) {
    throw new Error("Unauthorized");
  }

  const supabase = createSupabaseAdmin();
  
  const { error: updateError } = await supabase
    .from("registrations")
    .update({ payment_status: 'Confirmado' })
    .eq("id", id);

  if (updateError) {
    throw new Error("Failed to confirm registration");
  }

  revalidatePath(adminPath);
}
