import { listRegistrations } from "@/lib/registration-admin";
import { hasAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

// Excel interpreta células iniciadas por = + - @ como fórmula; o apóstrofo neutraliza.
function toCsvCell(value: string | null | undefined) {
  if (!value) return '""';
  const strValue = String(value);
  const safeValue = /^[=+\-@\t\r]/.test(strValue) ? `'${strValue}` : strValue;
  return `"${safeValue.replaceAll('"', '""')}"`;
}

export async function GET() {
  if (!(await hasAdminSession())) {
    return new Response("Não autorizado.", { status: 401 });
  }

  const registrations = await listRegistrations();
  
  const columns = [
    { label: "Data de Inscrição", value: (r: any) => new Date(r.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) },
    { label: "Nome", value: (r: any) => r.name },
    { label: "ID no Jogo", value: (r: any) => r.game_id },
    { label: "Instagram", value: (r: any) => r.instagram },
    { label: "WhatsApp", value: (r: any) => r.whatsapp },
    { label: "Posição 1", value: (r: any) => r.position_1 },
    { label: "Posição 2", value: (r: any) => r.position_2 },
    { label: "Posição 3", value: (r: any) => r.position_3 },
    { label: "Tamanho Camisa", value: (r: any) => r.shirt_size || "-" },
    { label: "Número Camisa", value: (r: any) => r.shirt_number || "-" },
    { label: "Pagamento", value: (r: any) => r.payment_status || "Pendente" },
  ];

  // Separador ";" e BOM: formato que o Excel em pt-BR abre em colunas e com acentos corretos.
  const csv = [
    columns.map((column) => toCsvCell(column.label)).join(";"),
    ...registrations.map((reg) =>
      columns.map((column) => toCsvCell(column.value(reg))).join(";"),
    ),
  ].join("\r\n");
  const date = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscricoes-vikings-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
