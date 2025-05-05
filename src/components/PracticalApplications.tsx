"use client";

import React from "react";
import { Applications } from "@/lib/archetypes";

interface Props {
  apps: Applications;
}

const categories: { key: keyof Applications; label: string }[] = [
  { key: "growth", label: "Growth" },
  { key: "collaboration", label: "Collaboration" },
  { key: "career", label: "Career Fit" },
];

export default function PracticalApplications({ apps }: Props) {
  // Check if there’s at least one non-empty list
  const hasAny =
    categories.some((cat) => Array.isArray(apps[cat.key]) && apps[cat.key].length > 0);

  if (!hasAny) return null;

  return (
    <section
      className="mt-6 p-4 border rounded bg-green-50"
      aria-labelledby="practical-apps-heading"
    >
      <h3 id="practical-apps-heading" className="text-xl font-semibold mb-4">
        Practical Applications
      </h3>

      {categories.map(({ key, label }) => {
        const list = apps[key];
        if (!Array.isArray(list) || list.length === 0) return null;

        return (
          <div key={key} className="mb-4 last:mb-0">
            <h4 className="font-semibold mb-1">{label}</h4>
            <ul className="list-disc ml-6">
              {list.map((item, i) => (
                <li key={i} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
