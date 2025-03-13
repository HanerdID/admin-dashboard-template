// src/app/(dashboard)/dashboard/page.tsx
"use client";

import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3Icon,
  CreditCardIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Data dummy untuk grafik area sales
const salesData = [
  { month: "Jan", revenue: 12000, expenses: 8000, profit: 4000 },
  { month: "Feb", revenue: 18000, expenses: 9000, profit: 9000 },
  { month: "Mar", revenue: 15000, expenses: 7500, profit: 7500 },
  { month: "Apr", revenue: 20000, expenses: 10000, profit: 10000 },
  { month: "May", revenue: 24000, expenses: 12000, profit: 12000 },
  { month: "Jun", revenue: 30000, expenses: 15000, profit: 15000 },
  { month: "Jul", revenue: 35000, expenses: 17000, profit: 18000 },
  { month: "Aug", revenue: 40000, expenses: 19000, profit: 21000 },
  { month: "Sep", revenue: 42000, expenses: 20000, profit: 22000 },
  { month: "Oct", revenue: 38000, expenses: 18000, profit: 20000 },
  { month: "Nov", revenue: 45000, expenses: 21000, profit: 24000 },
  { month: "Dec", revenue: 50000, expenses: 24000, profit: 26000 },
];

// Data dummy untuk grafik visitor
const visitorData = [
  { name: "Direct", value: 45 },
  { name: "Social", value: 25 },
  { name: "Referral", value: 20 },
  { name: "Organic", value: 10 },
];

// Warna untuk grafik pie
const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];

// Data dummy untuk grafik product top sales
const topProductsData = [
  { name: "Product A", sales: 150 },
  { name: "Product B", sales: 120 },
  { name: "Product C", sales: 90 },
  { name: "Product D", sales: 75 },
  { name: "Product E", sales: 60 },
];

// Data untuk grafik aktivitas
const activityData = [
  { day: "Mon", users: 230, orders: 45 },
  { day: "Tue", users: 280, orders: 52 },
  { day: "Wed", users: 310, orders: 55 },
  { day: "Thu", users: 295, orders: 59 },
  { day: "Fri", users: 320, orders: 65 },
  { day: "Sat", users: 350, orders: 72 },
  { day: "Sun", users: 265, orders: 48 },
];

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

export default function DashboardPage() {
  const [period, setPeriod] = useState("monthly");

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
              <BreadcrumbLink>Overview</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button>Download Report</Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          description="Total pendapatan bulan ini"
          icon={<DollarSignIcon className="h-5 w-5" />}
          change={12.3}
          trend="up"
        />
        <StatCard
          title="New Customers"
          value="1,254"
          description="Pelanggan baru bulan ini"
          icon={<UsersIcon className="h-5 w-5" />}
          change={8.2}
          trend="up"
        />
        <StatCard
          title="Orders"
          value="652"
          description="Order bulan ini"
          icon={<ShoppingCartIcon className="h-5 w-5" />}
          change={-2.1}
          trend="down"
        />
        <StatCard
          title="Average Order Value"
          value="$69.35"
          description="Nilai rata-rata order"
          icon={<CreditCardIcon className="h-5 w-5" />}
          change={3.7}
          trend="up"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Pendapatan, pengeluaran, dan profit
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPeriod("monthly")}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPeriod("quarterly")}
                  >
                    Quarterly
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPeriod("yearly")}
                  >
                    Yearly
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[350px] w-full p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={salesData}
                      margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3B82F6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3B82F6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorProfit"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.2}
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tickFormatter={(value) => `$${value / 1000}k`}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip
                        formatter={(value: number) => [
                          `$${value.toLocaleString()}`,
                          "",
                        ]}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#10B981"
                        fillOpacity={1}
                        fill="url(#colorProfit)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Sumber traffic pengunjung</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={visitorData}
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
                        {visitorData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip
                        formatter={(value: number) => [`${value}%`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>
                  Produk dengan penjualan tertinggi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topProductsData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis type="number" axisLine={false} tickLine={false} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                      />
                      <ChartTooltip
                        formatter={(value: number) => [`${value} units`, ""]}
                      />
                      <Bar
                        dataKey="sales"
                        fill="#8B5CF6"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Aktivitas pengguna per hari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={activityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.2}
                      />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <ChartTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>
                Analisis detail tentang penjualan dan tren
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] w-full p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      opacity={0.2}
                    />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <ChartTooltip
                      formatter={(value: number) => [
                        `$${value.toLocaleString()}`,
                        "",
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                    <Bar dataKey="expenses" fill="#F59E0B" name="Expenses" />
                    <Bar dataKey="profit" fill="#10B981" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>
                Pertumbuhan pelanggan dari waktu ke waktu
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] w-full p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      opacity={0.2}
                    />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <ChartTooltip />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                      name="Customer Growth"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Analytics</CardTitle>
              <CardDescription>Analisis performa produk</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] w-full p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topProductsData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis type="number" axisLine={false} tickLine={false} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                    />
                    <ChartTooltip
                      formatter={(value: number) => [`${value} units`, ""]}
                    />
                    <Bar dataKey="sales" fill="#EC4899" radius={[0, 4, 4, 0]} />
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
