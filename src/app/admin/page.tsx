import type { Metadata } from "next";
import { Users, Shirt } from "lucide-react";
import { listRegistrations } from "@/lib/registration-admin";
import { listUniformDeliveries } from "@/lib/uniform-delivery-admin";

export const metadata: Metadata = {
  title: "Dashboard | Vikings Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const registrations = await listRegistrations();
  const uniforms = await listUniformDeliveries();

  return (
    <div className="p-[clamp(16px,3vw,32px)]">
      <h1 className="font-display text-3xl leading-[0.9] font-extrabold uppercase text-white mb-6">
        Visão <span className="text-accent">Geral</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-black/40 border border-line-strong rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-text-muted">Total de Inscrições</h3>
            <Users className="w-5 h-5 text-accent-soft" />
          </div>
          <p className="text-3xl font-bold text-white">{registrations.length}</p>
        </div>
        
        <div className="bg-black/40 border border-line-strong rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-text-muted">Uniformes/Endereços</h3>
            <Shirt className="w-5 h-5 text-accent-bright" />
          </div>
          <p className="text-3xl font-bold text-white">{uniforms.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/40 border border-line-strong rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4">Últimas Inscrições</h3>
          <div className="space-y-4">
            {registrations.slice(0, 5).map(reg => (
              <div key={reg.id} className="flex items-center justify-between border-b border-line pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-white">{reg.name}</p>
                  <p className="text-xs text-text-muted">{reg.game_id} • @{reg.instagram}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-text-faint">
                    {new Date(reg.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            ))}
            {registrations.length === 0 && (
              <p className="text-sm text-text-muted">Nenhuma inscrição recente.</p>
            )}
          </div>
        </div>

        <div className="bg-black/40 border border-line-strong rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4">Últimos Endereços (Uniformes)</h3>
          <div className="space-y-4">
            {uniforms.slice(0, 5).map(uni => (
              <div key={uni.id} className="flex items-center justify-between border-b border-line pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-white">{uni.name}</p>
                  <p className="text-xs text-text-muted">{uni.city}, {uni.state}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-text-faint">
                    {new Date(uni.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            ))}
            {uniforms.length === 0 && (
              <p className="text-sm text-text-muted">Nenhum uniforme cadastrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
