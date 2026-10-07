import type { NextRequest } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { getLeadsForExport, parseLeadFilters } from "@/lib/leads";
import { leadStatusLabel } from "@/lib/lead-status";
import { serviceLabel } from "@/lib/services";
import { quoteReference } from "@/lib/site-config";

export const dynamic = "force-dynamic";

// Quote every cell and neutralise spreadsheet formulas (CSV injection).
function cell(value: string | null | undefined) {
  let text = value ?? "";
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  if (!(await hasAdminSession())) {
    return new Response("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const filters = parseLeadFilters(Object.fromEntries(request.nextUrl.searchParams));
  let rows: Awaited<ReturnType<typeof getLeadsForExport>>;
  try {
    rows = await getLeadsForExport(filters);
  } catch (error) {
    console.error("CSV export failed:", error instanceof Error ? error.message : error);
    return new Response("The database isn't reachable, so leads couldn't be exported. Open /admin/status for details.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  const header = ["Reference", "Received (UTC)", "Status", "Name", "Email", "Organisation", "Service", "Message", "Internal notes"];
  const lines = [
    header.map(cell).join(","),
    ...rows.map((lead) =>
      [
        quoteReference(lead.id),
        lead.createdAt.toISOString(),
        leadStatusLabel(lead.status),
        lead.name,
        lead.email,
        lead.company,
        serviceLabel(lead.service),
        lead.message,
        lead.notes,
      ]
        .map(cell)
        .join(","),
    ),
  ];

  const date = new Date().toISOString().slice(0, 10);
  return new Response(`\uFEFF${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
