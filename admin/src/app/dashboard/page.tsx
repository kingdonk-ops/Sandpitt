import type { Metadata } from "next";
import { ClipboardList, AlertTriangle, CheckCircle, Wrench } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "Dashboard" };

export const revalidate = 60; // Revalidate every 60 seconds

async function getStats() {
  try {
    const [summary, assets] = await Promise.all([
      api.reports.summary(),
      api.assets.list({ }),
    ]);
    return { summary, assetCount: assets.length };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const stats = await getStats();
  const byStatus = stats?.summary.by_status;
  const total = stats?.summary.total ?? 0;

  const overdue = 0; // TODO: implement overdue logic based on scheduled_at

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Inspections"
          value={total}
          description="All time"
          icon={<ClipboardList className="h-5 w-5" />}
        />
        <StatsCard
          title="Open"
          value={(byStatus?.scheduled ?? 0) + (byStatus?.in_progress ?? 0)}
          description="Scheduled + In Progress"
          icon={<ClipboardList className="h-5 w-5 text-blue-500" />}
        />
        <StatsCard
          title="Pending Review"
          value={byStatus?.pending_review ?? 0}
          description="Awaiting supervisor sign-off"
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
        />
        <StatsCard
          title="Completed"
          value={byStatus?.completed ?? 0}
          description="All time"
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
        />
      </div>

      {/* Status breakdown */}
      {stats && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-gray-900">
            Inspection Status Breakdown
          </h2>
          <div className="space-y-3">
            {Object.entries(byStatus ?? {}).map(([status, count]) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={status}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="capitalize text-gray-600">
                      {status.replace(/_/g, " ")}
                    </span>
                    <span className="font-medium text-gray-900">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!stats && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-amber-800 text-sm">
          Could not load stats — make sure the API is running at{" "}
          {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}.
        </div>
      )}
    </div>
  );
}
