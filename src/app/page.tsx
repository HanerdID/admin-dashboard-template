// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect pengguna ke halaman login saat mengakses root
  redirect("/login");
}
