// src/app/auth/signin/page.tsx
"use client";

import { signIn, getProviders, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState<Record<string, any>>({});

  // 1) If already logged in, bounce to homepage
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  // 2) Load OAuth providers once
  useEffect(() => {
    getProviders().then((prov) => {
      if (prov) setProviders(prov);
    });
  }, []);

  // 3) While checking auth, show loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  }

  // 4) If they somehow hit here authenticated, nothing else to render
  if (session) return null;

  // 5) Otherwise show sign-in buttons
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Sign in to P9 Framework</h1>

      {Object.values(providers).map((prov: any) => (
        <button
          key={prov.id}
          onClick={() => signIn(prov.id, { callbackUrl: "/" })}
          className="w-full max-w-xs py-2 px-4 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign in with {prov.name}
        </button>
      ))}
    </div>
  );
}
