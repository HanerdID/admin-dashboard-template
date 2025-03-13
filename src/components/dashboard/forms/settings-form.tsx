"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Validasi Schema
const settingsFormSchema = z.object({
  siteName: z.string().min(2, {
    message: "Nama situs harus minimal 2 karakter.",
  }),
  siteDescription: z.string().optional(),
  contactEmail: z.string().email({
    message: "Silakan masukkan alamat email yang valid.",
  }),
  language: z.string({
    required_error: "Pilih bahasa.",
  }),
  timezone: z.string({
    required_error: "Pilih zona waktu.",
  }),
  dateFormat: z.string({
    required_error: "Pilih format tanggal.",
  }),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  siteName: "Admin Dashboard",
  siteDescription: "Template dashboard admin untuk mengelola aplikasi.",
  contactEmail: "admin@example.com",
  language: "id",
  timezone: "Asia/Jakarta",
  dateFormat: "DD/MM/YYYY",
};

export function SettingsForm() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  function onSubmit(data: SettingsFormValues) {
    // Simulasi penyimpanan pengaturan
    console.log("Pengaturan disimpan:", data);

    // Tampilkan toast berhasil
    toast.success("Pengaturan berhasil disimpan", {
      description: "Perubahan Anda telah disimpan.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Situs</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Nama situs akan ditampilkan di judul browser dan header
                aplikasi.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="siteDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Situs</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Deskripsi singkat tentang situs Anda"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Deskripsi singkat yang menjelaskan tujuan situs Anda.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Kontak</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Email kontak utama untuk notifikasi dan komunikasi.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bahasa</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bahasa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zona Waktu</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih zona waktu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Asia/Jakarta">
                      Asia/Jakarta (GMT+7)
                    </SelectItem>
                    <SelectItem value="Asia/Singapore">
                      Asia/Singapore (GMT+8)
                    </SelectItem>
                    <SelectItem value="Asia/Tokyo">
                      Asia/Tokyo (GMT+9)
                    </SelectItem>
                    <SelectItem value="America/New_York">
                      America/New_York (GMT-4)
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      Europe/London (GMT+1)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateFormat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Format Tanggal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih format tanggal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Simpan Perubahan</Button>
        </div>
      </form>
    </Form>
  );
}
