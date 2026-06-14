import type { Metadata } from "next";
import Link from "next/link";
import { api, InspectionStatus } from "@/lib/api";
import { InspectionStatusBadge } from "@/components/InspectionStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Inspections" };
export const revalidate = 30;

const STATUS_OPTIONS: Array<{ label: string; value: string }> = [
  { label: "All", value: "" },
  { label: "Scheduled", value: "scheduled" },
  { label: "In Progress", value: "in_progress" },
  { label: "Pending Review", value: "pending_review" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

interface PageProps {
  searchParams: { status?: string; site_id?: string };
}

export default async function InspectionsPage({ searchParams }: PageProps) {
  const statusFilter = searchParams.status as InspectionStatus | undefined;
  const siteFilter = searchParams.site_id;

  const [inspections, sites] = await Promise.all([
    api.inspections.list({ status: statusFilter, site_id: siteFilter }).catch(() => []),
    api.sites.list().catch(() => []),
  ]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inspections</h1>
        <span className="text-sm text-gray-500">{inspections.length} records</span>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Status:</label>
          <div className="flex gap-1">
            {STATUS_OPTIONS.map((opt) => (
              <Link
                key={opt.value}
                href={`/inspections?${new URLSearchParams({
                  ...(opt.value ? { status: opt.value } : {}),
                  ...(siteFilter ? { site_id: siteFilter } : {}),
                })}`}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  (statusFilter ?? "") === opt.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scheduled</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inspections.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400 py-12">
                No inspections found.
              </TableCell>
            </TableRow>
          ) : (
            inspections.map((inspection) => (
              <TableRow key={inspection.id}>
                <TableCell>
                  <Link
                    href={`/inspections/${inspection.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {inspection.title}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-500">
                  {inspection.reference_number ?? "—"}
                </TableCell>
                <TableCell>
                  <InspectionStatusBadge status={inspection.status} />
                </TableCell>
                <TableCell className="text-gray-500">
                  {inspection.scheduled_at
                    ? new Date(inspection.scheduled_at).toLocaleDateString("en-AU")
                    : "—"}
                </TableCell>
                <TableCell className="text-gray-500">
                  {new Date(inspection.created_at).toLocaleDateString("en-AU")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
