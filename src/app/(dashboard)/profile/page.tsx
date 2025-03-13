"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profil</h2>
        <p className="text-muted-foreground">
          Kelola profil dan preferensi akun Anda
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-xl font-semibold">John Doe</h3>
                <p className="text-sm text-muted-foreground">Administrator</p>
                <Badge className="mt-2">Admin</Badge>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <Button>Ubah Foto</Button>
                  <Button variant="outline">Hapus</Button>
                </div>
                <div className="mt-8 w-full">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Online</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Terakhir Login: 15 menit yang lalu
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t py-2">
                    <span className="text-sm">Email</span>
                    <span className="text-sm">john.doe@example.com</span>
                  </div>
                  <div className="flex items-center justify-between border-t py-2">
                    <span className="text-sm">Bergabung</span>
                    <span className="text-sm">10 Januari 2023</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Akun</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Akun</CardTitle>
                  <CardDescription>
                    Perbarui informasi profil dan akun Anda.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama</Label>
                      <Input id="name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surname">Nama Belakang</Label>
                      <Input id="surname" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Administrator sistem dengan pengalaman 5 tahun dalam mengelola sistem berbasis web."
                      className="min-h-32"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Batal</Button>
                  <Button>Simpan Perubahan</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ubah Password</CardTitle>
                  <CardDescription>
                    Perbarui password akun Anda untuk keamanan.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Password Saat Ini</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password Baru</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Konfirmasi Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Batal</Button>
                  <Button>Perbarui Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Notifikasi</CardTitle>
                  <CardDescription>
                    Kelola preferensi notifikasi yang Anda terima.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notifikasi Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Terima notifikasi melalui email.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notifikasi Sistem</Label>
                        <p className="text-sm text-muted-foreground">
                          Terima notifikasi di dalam dashboard.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notifikasi Marketing</Label>
                        <p className="text-sm text-muted-foreground">
                          Terima update dan newsletter marketing.
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notifikasi Keamanan</Label>
                        <p className="text-sm text-muted-foreground">
                          Terima peringatan keamanan dan aktivitas akun.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Batal</Button>
                  <Button>Simpan Preferensi</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
