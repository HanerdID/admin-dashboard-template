import React from "react";
import Link from "next/link";
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

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Reset Password
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Buat password baru untuk akun Anda
        </p>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Buat Password Baru
          </CardTitle>
          <CardDescription className="text-center">
            Password harus terdiri dari minimal 8 karakter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none"
                >
                  Password Baru
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium leading-none"
                >
                  Konfirmasi Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                />
              </div>
              <Button className="w-full">Reset Password</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Kembali ke halaman login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
