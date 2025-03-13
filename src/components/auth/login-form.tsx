// src/components/auth/login-form.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, SignInResponse } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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

// Validasi form login
const loginSchema = z.object({
  email: z.string().email({
    message: "Masukkan alamat email yang valid.",
  }),
  password: z.string().min(6, {
    message: "Password harus memiliki minimal 6 karakter.",
  }),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form handling dengan react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handler submit form
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Login Gagal", {
          description: "Email atau password tidak valid. Silakan coba lagi.",
        });
      } else {
        toast.success("Login Berhasil", {
          description: "Anda berhasil masuk ke dashboard.",
        });
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi Kesalahan", {
        description: "Tidak dapat melakukan login. Silakan coba lagi nanti.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Handler login dengan Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Terjadi Kesalahan", {
        description:
          "Tidak dapat login dengan Google. Silakan coba lagi nanti.",
      });
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
          Masuk ke dalam dashboard untuk mengelola aplikasi Anda
        </p>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Masuk
          </CardTitle>
          <CardDescription className="text-center">
            Masukkan kredensial Anda untuk mengakses dashboard
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
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-medium cursor-pointer">
                            Ingat saya
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Lupa password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Memproses..." : "Masuk"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="google">
              <div className="space-y-4">
                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                  Masuk menggunakan akun Google Anda
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
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
                  Masuk dengan Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Belum memiliki akun?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Daftar sekarang
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
