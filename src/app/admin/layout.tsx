import { ReactNode } from "react";
import { hasAdminSession } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!(await hasAdminSession())) {
    return <AdminLogin />;
  }

  return (
    <div className="flex min-h-screen bg-bg text-text vl-texture-page">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black/10">
          {children}
        </main>
      </div>
    </div>
  );
}
