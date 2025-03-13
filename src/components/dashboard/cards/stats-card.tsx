import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  change?: number;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  change,
  trend = "neutral",
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {change !== undefined && (
          <div className="flex items-center space-x-1 mt-2 text-xs">
            {trend === "up" ? (
              <ArrowUp className="h-3 w-3 text-emerald-500" />
            ) : trend === "down" ? (
              <ArrowDown className="h-3 w-3 text-red-500" />
            ) : null}
            <span
              className={
                trend === "up"
                  ? "text-emerald-500"
                  : trend === "down"
                  ? "text-red-500"
                  : "text-slate-500"
              }
            >
              {change}%
            </span>
            <span className="text-slate-500">dari periode sebelumnya</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
