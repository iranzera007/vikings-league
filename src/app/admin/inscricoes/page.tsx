import type { Metadata } from "next";
import { CheckCircle2, Image as ImageIcon } from "lucide-react";
import {
  listRegistrations,
  getPhotoSignedUrl
} from "@/lib/registration-admin";
import { DeleteButton } from "./delete-button";
import { ConfirmButton } from "./confirm-button";

export const metadata: Metadata = {
  title: "Inscrições | Vikings Admin",
  robots: { index: false, follow: false },
};

export default async function RegistrationAdminPage() {
  const registrations = await listRegistrations();
  
  // Create a mapping of id to signed url for photos
  const photoUrls: Record<string, string | null> = {};
  for (const reg of registrations) {
    if (reg.photo_object_path) {
      photoUrls[reg.id] = await getPhotoSignedUrl(reg.photo_object_path);
    }
  }

  return (
    <div className="p-[clamp(16px,3vw,32px)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl leading-[0.9] font-extrabold uppercase text-white">
            Inscrições
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            {registrations.length} {registrations.length === 1 ? "inscrição registrada" : "inscrições registradas"}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto border border-line-strong bg-black/40 rounded-lg">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="border-b border-line-strong bg-black/30">
            <tr>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">Foto</th>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">Data</th>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">Nome</th>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">ID no jogo</th>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">Instagram</th>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">WhatsApp</th>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">Posições</th>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">Camisa</th>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">Pagamento</th>
              <th className="px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-b border-line last:border-b-0 hover:bg-white/4">
                <td className="px-4 py-3">
                  {photoUrls[reg.id] ? (
                    <a href={photoUrls[reg.id]!} target="_blank" rel="noopener" className="inline-flex items-center text-accent hover:text-white transition-colors" title="Ver foto">
                      <ImageIcon width={20} height={20} />
                    </a>
                  ) : (
                    <span className="text-text-faint">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-text-body">
                  {new Date(reg.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
                </td>
                <td className="px-4 py-3 text-white font-bold">{reg.name}</td>
                <td className="px-4 py-3 text-text-body">{reg.game_id}</td>
                <td className="px-4 py-3 text-text-body">
                  <a href={`https://instagram.com/${reg.instagram}`} target="_blank" rel="noopener" className="text-accent-soft hover:underline">
                    @{reg.instagram}
                  </a>
                </td>
                <td className="px-4 py-3 text-text-body">
                  <a href={`https://wa.me/${reg.whatsapp}`} target="_blank" rel="noopener" className="text-accent-soft hover:underline">
                    {reg.whatsapp}
                  </a>
                </td>
                <td className="px-4 py-3 text-text-body">
                  {reg.position_1}, {reg.position_2}, {reg.position_3}
                </td>
                <td className="px-4 py-3 text-text-body">
                  {reg.shirt_size && reg.shirt_number ? `${reg.shirt_size} (${reg.shirt_number})` : "-"}
                </td>
                <td className="px-4 py-3 text-text-body">
                  {reg.payment_status === "Confirmado" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                      <CheckCircle2 width={14} height={14} />
                      Confirmado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-text-muted">
                      <CheckCircle2 width={14} height={14} className="text-text-faint" />
                      {reg.payment_status || "Pendente"}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <ConfirmButton id={reg.id} name={reg.name} isConfirmed={reg.payment_status === "Confirmado"} />
                  <DeleteButton id={reg.id} name={reg.name} />
                </td>
              </tr>
            ))}
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-text-faint">
                  Nenhuma inscrição ainda.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
