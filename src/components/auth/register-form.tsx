"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Validasi form register
const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: "Nama harus memiliki minimal 2 karakter.",
    }),
    email: z.string().email({
      message: "Masukkan alamat email yang valid.",
    }),
    password: z.string().min(8, {
      message: "Password harus memiliki minimal 8 karakter.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password harus memiliki minimal 8 karakter.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui syarat dan ketentuan.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form handling dengan react-hook-form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // Handler submit form
  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      // Simulasi register dengan API (ganti dengan implementasi sebenarnya)
      console.log("Register data:", data);

      // Simulasi penundaan
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Registrasi Berhasil", {
        description: "Akun Anda telah berhasil dibuat.",
      });

      // Redirect ke login page
      router.push("/login");
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Terjadi Kesalahan", {
        description: "Tidak dapat mendaftarkan akun. Silakan coba lagi nanti.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Handler register dengan Google
  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      // Simulasi register dengan Google
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Registrasi Berhasil", {
        description: "Akun Anda telah berhasil dibuat dengan Google.",
      });

      // Redirect ke dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Google register error:", error);
      toast.error("Terjadi Kesalahan", {
        description:
          "Tidak dapat mendaftar dengan Google. Silakan coba lagi nanti.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Buat akun baru untuk mengakses dashboard
        </p>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Daftar
          </CardTitle>
          <CardDescription className="text-center">
            Buat akun baru untuk mengakses dashboard admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="credentials" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="credentials">Email</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
            </TabsList>

            <TabsContent value="credentials">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                              placeholder="Nama Lengkap"
                              className="pl-10"
                              {...field}
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                              placeholder="nama@perusahaan.com"
                              className="pl-10"
                              {...field}
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="pl-10"
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-1 top-1 h-8 w-8 p-0"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              className="pl-10"
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-1 top-1 h-8 w-8 p-0"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md pt-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            Saya menyetujui{" "}
                            <Link
                              href="/terms"
                              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              syarat dan ketentuan
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Mendaftar..." : "Daftar"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="google">
              <div className="space-y-4">
                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                  Daftar menggunakan akun Google Anda
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleRegister}
                  disabled={isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Daftar dengan Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Masuk
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
