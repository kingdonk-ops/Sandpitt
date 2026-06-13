import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Download } from "lucide-react";
import { api } from "@/lib/api";
import { InspectionStatusBadge } from "@/components/InspectionStatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 30;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const inspection = await api.inspections.get(params.id);
    return { title: inspection.title };
  } catch {
    return { title: "Inspection Detail" };
  }
}

const RESULT_BADGE: Record<string, { label: string; variant: "success" | "danger" | "muted" | "default" }> = {
  pass: { label: "Pass", variant: "success" },
  fail: { label: "Fail", variant: "danger" },
  na: { label: "N/A", variant: "muted" },
  pending: { label: "Pending", variant: "default" },
};

export default async function InspectionDetailPage({ params }: PageProps) {
  let inspection;
  try {
    inspection = await api.inspections.get(params.id);
  } catch {
    notFound();
  }

  const passCount = inspection.items.filter((i) => i.result === "pass").length;
  const failCount = inspection.items.filter((i) => i.result === "fail").length;
  const pendingCount = inspection.items.filter((i) => i.result === "pending").length;

  return (
    <div>
      {/* Back nav */}
      <Link
        href="/inspections"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Inspections
      </Link>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{inspection.title}</h1>
          {inspection.reference_number && (
            <p className="mt-1 text-sm text-gray-500">Ref: {inspection.reference_number}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <InspectionStatusBadge status={inspection.status} />
          <Button
            variant="secondary"
            size="sm"
            disabled
            title="PDF generation coming soon"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 text-sm">
              <span className="text-green-600 font-semibold">{passCount} pass</span>
              <span className="text-red-600 font-semibold">{failCount} fail</span>
              <span className="text-gray-400">{pendingCount} pending</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-gray-900">
              {inspection.scheduled_at
                ? new Date(inspection.scheduled_at).toLocaleString("en-AU")
                : "Not scheduled"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-gray-900">
              {inspection.submitted_at
                ? new Date(inspection.submitted_at).toLocaleString("en-AU")
                : "Not yet submitted"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Checklist items */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Checklist ({inspection.items.length} items)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {inspection.items.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-gray-400">No checklist items.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {inspection.items.map((item, idx) => {
                const badge = RESULT_BADGE[item.result] ?? RESULT_BADGE.pending;
                return (
                  <li key={item.id} className="flex items-start gap-4 px-6 py-4">
                    <span className="mt-0.5 text-xs text-gray-400 w-6 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">{item.question}</p>
                      {item.notes && (
                        <p className="mt-1 text-xs text-gray-500">{item.notes}</p>
                      )}
                      {item.photos.length > 0 && (
                        <p className="mt-1 text-xs text-blue-500">
                          {item.photos.length} photo{item.photos.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Photos */}
      {inspection.photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Photos ({inspection.photos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {inspection.photos.map((photo) =>
                photo.presigned_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={photo.id}
                    src={photo.presigned_url}
                    alt={photo.caption ?? photo.original_filename ?? "photo"}
                    className="aspect-square w-full rounded-lg object-cover bg-gray-100"
                  />
                ) : null
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
