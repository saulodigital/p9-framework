"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Centroid } from "@/lib/archetypeCentroids";
import { ArchetypeIcon } from "./Icons";

// Dynamically load so we don’t SSR the chart
const ClientRadar = dynamic(() => import("./ClientRadar"), { ssr: false });

export interface ArchetypeCardProps {
  slug: string;
  name: string;
  signature: string;
  centroid: Centroid[];
}

export function ArchetypeCard({
  slug,
  name,
  signature,
  centroid,
}: ArchetypeCardProps) {
  return (
    <Link
      href={`/archetype/${slug}`}
      className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center"
    >
      <div className="mb-4 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
        {ArchetypeIcon[slug]}
      </div>

      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 text-center mb-4">{signature}</p>

      <ClientRadar data={centroid} slug={slug} name={name} />

      <span className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition">
        Learn More
      </span>
    </Link>
  );
}
