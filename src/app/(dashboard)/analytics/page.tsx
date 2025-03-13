"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BarChart3Icon,
  PieChartIcon,
  LineChartIcon,
  UsersIcon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Data dummy untuk grafik
const monthlyData = [
  { name: "Jan", visitors: 1200, orders: 45, revenue: 4500 },
  { name: "Feb", visitors: 1900, orders: 58, revenue: 5800 },
  { name: "Mar", visitors: 1500, orders: 52, revenue: 5200 },
  { name: "Apr", visitors: 1800, orders: 64, revenue: 6400 },
  { name: "May", visitors: 2200, orders: 85, revenue: 8500 },
  { name: "Jun", visitors: 2600, orders: 95, revenue: 9500 },
  { name: "Jul", visitors: 2900, orders: 105, revenue: 10500 },
  { name: "Aug", visitors: 3100, orders: 110, revenue: 11000 },
  { name: "Sep", visitors: 2800, orders: 90, revenue: 9000 },
  { name: "Oct", visitors: 2500, orders: 82, revenue: 8200 },
  { name: "Nov", visitors: 2300, orders: 76, revenue: 7600 },
  { name: "Dec", visitors: 2700, orders: 100, revenue: 10000 },
];

const trafficSourceData = [
  { name: "Direct", value: 40 },
  { name: "Organic Search", value: 30 },
  { name: "Social Media", value: 20 },
  { name: "Referral", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Komponen kartu statistik
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  change: number;
  trend: "up" | "down" | "neutral";
}

function StatCard({
  title,
  value,
  description,
  icon,
  change,
  trend,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-slate-500">{description}</p>
        <div className="flex items-center space-x-1 mt-2 text-xs">
          {trend === "up" ? (
            <ArrowUpIcon className="h-3 w-3 text-emerald-500" />
          ) : trend === "down" ? (
            <ArrowDownIcon className="h-3 w-3 text-red-500" />
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
          <span className="text-slate-500">dari bulan lalu</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Analytics</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button>Download Report</Button>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground mt-1">
          Pantau dan analisis metrik kinerja bisnis Anda.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pengunjung"
          value="24,500"
          description="+15.2% dari bulan lalu"
          icon={<UsersIcon className="h-5 w-5" />}
          change={15.2}
          trend="up"
        />
        <StatCard
          title="Total Pendapatan"
          value="$45,231.89"
          description="+20.1% dari bulan lalu"
          icon={<BarChart3Icon className="h-5 w-5" />}
          change={20.1}
          trend="up"
        />
        <StatCard
          title="Pesanan Baru"
          value="962"
          description="+12.5% dari bulan lalu"
          icon={<LineChartIcon className="h-5 w-5" />}
          change={12.5}
          trend="up"
        />
        <StatCard
          title="Tingkat Konversi"
          value="3.8%"
          description="+2.1% dari bulan lalu"
          icon={<PieChartIcon className="h-5 w-5" />}
          change={2.1}
          trend="up"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="visitors">Pengunjung</TabsTrigger>
          <TabsTrigger value="revenue">Pendapatan</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Pengunjung & Pesanan</CardTitle>
                <CardDescription>
                  Perbandingan pengunjung dan pesanan bulanan
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.2}
                      />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="visitors"
                        stroke="#8884d8"
                        name="Pengunjung"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#82ca9d"
                        name="Pesanan"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sumber Traffic</CardTitle>
                <CardDescription>
                  Distribusi sumber traffic pengunjung
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {trafficSourceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Pendapatan Bulanan</CardTitle>
              <CardDescription>
                Tren pendapatan bulanan tahun ini
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      opacity={0.2}
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Pendapatan"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengunjung Detail</CardTitle>
              <CardDescription>
                Analisis mendalam tentang pengunjung situs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      opacity={0.2}
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" fill="#8884d8" name="Pengunjung" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analisis Pendapatan</CardTitle>
              <CardDescription>
                Tinjauan mendetail tentang pendapatan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      opacity={0.2}
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Pendapatan"]}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#82ca9d" name="Pendapatan" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
