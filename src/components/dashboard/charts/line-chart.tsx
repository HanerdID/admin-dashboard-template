"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  title: string;
  description?: string;
  data: any[];
  xKey: string;
  lines: {
    key: string;
    name: string;
    color: string;
  }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function LineChart({
  title,
  description,
  data,
  xKey,
  lines,
  height = 300,
  showGrid = true,
  showLegend = true,
  valueFormatter = (value) => `${value}`,
  className,
}: LineChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-2">
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.2}
                />
              )}
              <XAxis dataKey={xKey} axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value: number) => [valueFormatter(value), ""]}
                contentStyle={{
                  borderRadius: "6px",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
              {showLegend && <Legend />}
              {lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.key}
                  name={line.name}
                  stroke={line.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
