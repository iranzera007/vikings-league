import type { Metadata } from "next";
import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  listUniformDeliveries,
  uniformDeliveryColumns,
} from "@/lib/uniform-delivery-admin";

export const metadata: Metadata = {
  title: "Uniformes | Vikings Admin",
  robots: { index: false, follow: false },
};

export default async function UniformDeliveryAdminPage() {
  const deliveries = await listUniformDeliveries();

  return (
    <div className="p-[clamp(16px,3vw,32px)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl leading-[0.9] font-extrabold uppercase text-white">
            Endereços <span className="text-accent">Uniformes</span>
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            {deliveries.length} {deliveries.length === 1 ? "jogador cadastrado" : "jogadores cadastrados"}
          </p>
        </div>
        <div className="flex gap-2">
          {/* We keep the old export route, but we could migrate it as well. For now, just point to the existing one */}
          <a href="/api/admin/export-uniforms" className={buttonVariants({ size: "sm" })}>
            <Download width={16} height={16} strokeWidth={1.8} aria-hidden />
            EXPORTAR CSV
          </a>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto border border-line-strong bg-black/40 rounded-lg">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="border-b border-line-strong bg-black/30">
            <tr>
              {uniformDeliveryColumns.map((column) => (
                <th
                  key={column.label}
                  className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="border-b border-line last:border-b-0 hover:bg-white/4">
                {uniformDeliveryColumns.map((column) => (
                  <td key={column.label} className="px-4 py-3 text-text-body">
                    {column.href ? (
                      <a
                        href={column.href(delivery)}
                        target="_blank"
                        rel="noopener"
                        className="text-accent-soft underline-offset-4 hover:underline"
                      >
                        {column.value(delivery)}
                      </a>
                    ) : (
                      column.value(delivery)
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {deliveries.length === 0 ? (
              <tr>
                <td colSpan={uniformDeliveryColumns.length} className="px-4 py-8 text-center text-text-faint">
                  Nenhum cadastro ainda.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
