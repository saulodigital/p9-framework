"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { computeProfile, computeDimensionAverages } from "@/lib/scoring";
import DimensionRadar from "@/components/DimensionRadar";
import PracticalApplications from "@/components/PracticalApplications";
import PersonalizedInsights from "@/components/PersonalizedInsights";
import LabelFeedback from "@/components/LabelFeedback";
import { WalletConnect } from "@/components/WalletConnect";
import { ArchetypeIcon } from "@/components/Icons";

// Only plain data—no React nodes or functions
type ProfileItem = {
  slug: string;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  applications: {
    growth: string[];
    collaboration: string[];
    career: string[];
  };
  score: number;
  tier: string;
};

export default function ResultsPage() {
  const [dimData, setDimData] = useState<{ dimension: string; score: number }[]>(
    []
  );
  const [profile, setProfile] = useState<ProfileItem[] | null>(null);

  // For “Save Profile” via email
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Only runs in browser
    const stored = window.localStorage.getItem("answers") || "{}";
    const answers = JSON.parse(stored) as Record<string, number>;

    // Dimension averages
    const dimAvgs = computeDimensionAverages(answers);
    setDimData(
      Object.entries(dimAvgs).map(([dimension, score]) => ({ dimension, score }))
    );

    // Archetype scores & tiers
    const raw = computeProfile(answers);
    const SECONDARY = 0.6;
    const SUPPORTING = 0.3;
    const clean: ProfileItem[] = raw.map((a, i) => ({
      slug: a.slug,
      name: a.name,
      description: a.description,
      strengths: a.strengths,
      challenges: a.challenges,
      recommendations: a.recommendations,
      applications: a.applications,
      score: a.score,
      tier:
        i === 0
          ? "Primary"
          : a.score >= SECONDARY
            ? "Secondary"
            : a.score >= SUPPORTING
              ? "Supporting"
              : "Minor",
    }));
    setProfile(clean);
  }, []);

  if (!profile) return <div>Loading your results…</div>;
  const primary = profile[0];

  // Save handler
  const handleSave = async () => {
    setSaving(true);
    try {
      const answers = JSON.parse(
        window.localStorage.getItem("answers") || "{}"
      );
      const res = await fetch("/api/save-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, archetype: primary.slug, answers }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(true);
    } catch (err: any) {
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your P9 Profile</h2>
        <Link href="/questionnaire" className="text-sm text-blue-500 underline">
          Retake Test
        </Link>
      </header>

      {/* Save via Email + Wallet Connect */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
        <input
          type="email"
          placeholder="Your email to save profile"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSave}
          disabled={!email || saving || saved}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
        >
          {saved ? "Saved ✓" : saving ? "Saving…" : "Save Profile"}
        </button>
        <WalletConnect />
      </section>

      {/* Dimension Scores & Radar */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Dimension Scores</h3>
        <ul className="grid grid-cols-2 gap-3 mb-4 text-sm">
          {dimData.map((d) => (
            <li key={d.dimension}>
              <strong>{d.dimension}</strong>: {d.score.toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <DimensionRadar data={dimData} />
        </div>
      </section>

      {/* Primary Archetype */}
      <section className="bg-blue-50 p-4 rounded shadow flex items-start space-x-4">
        <div>{ArchetypeIcon[primary.slug]}</div>
        <div>
          <h3 className="text-xl font-semibold">{primary.name}</h3>
          <p className="mt-1 mb-2">Score: {primary.score.toFixed(2)}</p>
          <p className="mb-4">{primary.description}</p>
          <Link
            href={`/archetype/${primary.slug}`}
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Tailored Content */}
      <PracticalApplications apps={primary.applications} />
      <PersonalizedInsights recommendations={primary.recommendations} />
      <LabelFeedback label={primary.slug} />
    </div>
  );
}
