import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clsx } from "clsx";

interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={clsx("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon && <div className="text-gray-400">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
        {trend && (
          <p
            className={clsx(
              "mt-2 text-xs font-medium",
              trend.value >= 0 ? "text-green-600" : "text-red-600"
            )}
          >
            {trend.value >= 0 ? "▲" : "▼"} {Math.abs(trend.value)}% {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
