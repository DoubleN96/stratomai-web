"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "01 Jun", leads: 28, conversiones: 12 },
  { date: "08 Jun", leads: 45, conversiones: 18 },
  { date: "15 Jun", leads: 62, conversiones: 25 },
  { date: "22 Jun", leads: 51, conversiones: 22 },
  { date: "29 Jun", leads: 78, conversiones: 34 },
  { date: "06 Jul", leads: 92, conversiones: 41 },
  { date: "13 Jul", leads: 86, conversiones: 38 },
];

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento Últimas Semanas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="hsl(217, 91%, 60%)"
              fillOpacity={1}
              fill="url(#colorLeads)"
              strokeWidth={2}
              name="Leads"
            />
            <Area
              type="monotone"
              dataKey="conversiones"
              stroke="hsl(142, 76%, 36%)"
              fillOpacity={1}
              fill="url(#colorConversions)"
              strokeWidth={2}
              name="Conversiones"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
