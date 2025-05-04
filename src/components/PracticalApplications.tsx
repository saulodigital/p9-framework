import React from "react";
import { PracticalApplications } from "@/lib/archetypes";

interface Props {
  apps: PracticalApplications;
}

export default function PracticalApplications({ apps }: Props) {
  return (
    <div className="mt-6 p-4 border rounded bg-green-50">
      <h3 className="text-xl font-semibold mb-2">Practical Applications</h3>

      <div>
        <h4 className="font-semibold">Growth</h4>
        <ul className="list-disc ml-6">
          {apps.growth.map((item, i) => (
            <li key={i} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">Collaboration</h4>
        <ul className="list-disc ml-6">
          {apps.collaboration.map((item, i) => (
            <li key={i} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">Career Fit</h4>
        <ul className="list-disc ml-6">
          {apps.career.map((item, i) => (
            <li key={i} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
