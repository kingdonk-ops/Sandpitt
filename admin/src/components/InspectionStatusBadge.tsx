import React from "react";
import { Badge } from "@/components/ui/badge";
import type { InspectionStatus } from "@/lib/api";

const STATUS_CONFIG: Record<
  InspectionStatus,
  { label: string; variant: "default" | "success" | "warning" | "danger" | "info" | "muted" }
> = {
  scheduled: { label: "Scheduled", variant: "default" },
  in_progress: { label: "In Progress", variant: "warning" },
  pending_review: { label: "Pending Review", variant: "info" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "danger" },
};

interface Props {
  status: InspectionStatus;
}

export function InspectionStatusBadge({ status }: Props) {
  const { label, variant } = STATUS_CONFIG[status] ?? {
    label: status,
    variant: "muted" as const,
  };
  return <Badge variant={variant}>{label}</Badge>;
}
