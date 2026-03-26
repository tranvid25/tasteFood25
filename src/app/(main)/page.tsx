"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
      <button type="button" onClick={() => router.push("/login")}>
        chuyển sang trang Login
      </button>
    </main>
  );
}
