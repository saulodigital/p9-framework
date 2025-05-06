// components/SaveBanner.tsx
"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { computeProfile } from "@/lib/scoring";

export function SaveBanner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  if (status === "loading") return null;

  // 1) Not signed in
  if (!session) {
    return (
      <button
        onClick={() =>
          signIn(undefined, { callbackUrl: window.location.href })
        }
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign in to Save
      </button>
    );
  }

  // 2) Signed in → Save to history
  const handleSave = async () => {
    setSaving(true);
    try {
      // 1) load the raw answers
      const answers = JSON.parse(
        window.localStorage.getItem("answers") || "{}"
      ) as Record<string, number>;

      // 2) recompute the profile here to get fresh updated data
      const prof = computeProfile(answers);
      if (prof.length === 0) {
        throw new Error("No profile available");
      }
      const primarySlug = prof[0].slug;

      // 3) call the API
      const res = await fetch("/api/save-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          archetype: primarySlug,
          answers,
        }),
      });
      if (!res.ok) throw new Error(await res.text());

      toast.success("Saved to your Profile!");
      // optionally: router.push("/profile/history");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Couldn’t save your results");
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
    >
      {saving ? "Saving..." : "Save"}
    </button>
  );
}
