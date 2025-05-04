import React from "react";
import { PracticalApplications } from "@/lib/archetypes";

interface Props {
  apps: PracticalApplications;
}

export default function PracticalApplications({ apps }: Props) {
  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold">Practical Applications</h3>

      <div>
        <h4 className="font-medium">• Growth</h4>
        <ul className="list-disc list-inside ml-4">
          {apps.growth.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium">• Collaboration</h4>
        <ul className="list-disc list-inside ml-4">
          {apps.collaboration.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium">• Career Fit</h4>
        <ul className="list-disc list-inside ml-4">
          {apps.career.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
