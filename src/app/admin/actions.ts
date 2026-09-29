"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminSessionCookie,
  adminSessionMaxAge,
  createAdminSession,
  isAdminPassword,
} from "@/lib/admin-auth";

export async function loginAction(prevState: string | null, formData: FormData) {
  const password = formData.get("password");
  if (typeof password !== "string" || !isAdminPassword(password)) {
    return "Senha incorreta.";
  }

  (await cookies()).set(adminSessionCookie, createAdminSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: adminSessionMaxAge,
  });

  // We do not redirect here because we might be on any /admin/ route.
  // Next.js will re-render the layout which will see the cookie and show the children.
  // Wait, if we submit from a form on /admin, we can just reload the page or redirect to /admin.
  redirect("/admin");
}

export async function logoutAction() {
  (await cookies()).set(adminSessionCookie, "", { path: "/admin", maxAge: 0 });
  redirect("/admin");
}
