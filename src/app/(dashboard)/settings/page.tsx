"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTheme } from "next-themes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Brush, Globe, Bell, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

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
              <BreadcrumbLink>Settings</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button>Save All Settings</Button>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground mt-1">
          Kelola pengaturan aplikasi dan preferensi
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="appearance">Tampilan</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="advanced">Lanjutan</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Pengaturan Umum</CardTitle>
                  <CardDescription>
                    Pengaturan dasar untuk aplikasi dashboard.
                  </CardDescription>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nama Situs</Label>
                <Input id="site-name" defaultValue="Admin Dashboard" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Deskripsi Situs</Label>
                <Input
                  id="site-description"
                  defaultValue="Dashboard admin untuk mengelola aplikasi."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Bahasa</Label>
                <Select defaultValue="id">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Waktu</Label>
                <Select defaultValue="asia-jakarta">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Pilih zona waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-jakarta">
                      Asia/Jakarta (GMT+7)
                    </SelectItem>
                    <SelectItem value="america-ny">
                      America/New_York (GMT-4)
                    </SelectItem>
                    <SelectItem value="europe-london">
                      Europe/London (GMT+1)
                    </SelectItem>
                    <SelectItem value="asia-tokyo">
                      Asia/Tokyo (GMT+9)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Pengaturan Tampilan</CardTitle>
                  <CardDescription>
                    Sesuaikan tampilan dashboard.
                  </CardDescription>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Brush className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    className={`flex aspect-video items-center justify-center rounded-md border border-muted bg-white px-3 py-2 font-medium 
                      ${theme === "light" ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setTheme("light")}
                  >
                    <span>Light</span>
                  </button>
                  <button
                    className={`flex aspect-video items-center justify-center rounded-md border border-muted bg-slate-950 px-3 py-2 font-medium text-white 
                      ${theme === "dark" ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setTheme("dark")}
                  >
                    <span>Dark</span>
                  </button>
                  <button
                    className={`flex aspect-video items-center justify-center rounded-md border border-muted bg-gradient-to-br from-white to-slate-800 px-3 py-2 font-medium 
                      ${theme === "system" ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setTheme("system")}
                  >
                    <span>System</span>
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">Ukuran Font</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Pilih ukuran font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Kecil</SelectItem>
                    <SelectItem value="medium">Sedang</SelectItem>
                    <SelectItem value="large">Besar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sidebar Minimized</Label>
                  <p className="text-sm text-muted-foreground">
                    Tampilkan sidebar dalam mode compact.
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Pengaturan Notifikasi</CardTitle>
                  <CardDescription>
                    Sesuaikan preferensi notifikasi sistem.
                  </CardDescription>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Bell className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="new-orders" />
                <Label htmlFor="new-orders" className="flex flex-col">
                  <span>Pesanan Baru</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Dapatkan notifikasi saat ada pesanan baru.
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="low-stock" defaultChecked />
                <Label htmlFor="low-stock" className="flex flex-col">
                  <span>Stok Menipis</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Dapatkan notifikasi saat produk hampir habis.
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="user-registration" defaultChecked />
                <Label htmlFor="user-registration" className="flex flex-col">
                  <span>Registrasi Pengguna</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Dapatkan notifikasi saat ada pengguna baru.
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="system-alerts" defaultChecked />
                <Label htmlFor="system-alerts" className="flex flex-col">
                  <span>Peringatan Sistem</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Peringatan tentang performa dan kesehatan sistem.
                  </span>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Preferensi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Pengaturan Lanjutan</CardTitle>
                  <CardDescription>
                    Konfigurasi pengaturan lanjutan (hati-hati).
                  </CardDescription>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode Debug</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan mode debug untuk pencatatan terperinci.
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>API Throttling</Label>
                  <p className="text-sm text-muted-foreground">
                    Batasi jumlah permintaan API per menit.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cache-ttl">Cache TTL (menit)</Label>
                <Input id="cache-ttl" type="number" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Button variant="destructive">Reset Semua Pengaturan</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
