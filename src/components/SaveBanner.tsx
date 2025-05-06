// components/SaveBanner.tsx
"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { computeProfile } from "@/lib/scoring";
import { useTestId } from "@/hooks/useTestId";

export function SaveBanner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const testId = useTestId();

  // While NextAuth is initializing
  if (status === "loading") return null;

  // Not signed in, prompt login
  if (!session?.user?.email) {
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

  // Core save logic, with idempotent testId
  const saveToServer = async () => {
    if (!testId) {
      throw new Error("No test identifier found");
    }

    const answers = JSON.parse(
      window.localStorage.getItem("answers") || "{}"
    ) as Record<string, number>;

    const prof = computeProfile(answers);
    if (prof.length === 0) {
      throw new Error("You haven’t completed the test yet.");
    }

    const res = await fetch("/api/save-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testId,
        email: session.user.email,
        archetype: prof[0].slug,
        answers,
      }),
    });

    const payload = await res.json();
    if (!res.ok) {
      throw new Error(payload.error || res.statusText);
    }
    return payload.alreadySaved as boolean;
  };

  // Saving handler
  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const already = await saveToServer();
      if (already) {
        toast("You’ve already saved this result.");
      } else {
        toast.success("Saved to your profile!");
      }
      // e.g. router.push("/profile/history")
    } catch (err: any) {
      console.error("Save failed:", err);
      toast.error(err.message || "Couldn’t save your results");
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className={`
        px-4 py-2 rounded text-white
        ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
      `}
    >
      {saving ? "Saving..." : "Save Results"}
    </button>
  );
}
