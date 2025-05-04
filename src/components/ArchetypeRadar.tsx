"use client";

import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

interface ArchetypeRadarProps {
  slug: string;
  name: string;
  data: { dimension: string;[key: string]: number | string }[];
}

export default function ArchetypeRadar({ slug, name, data }: ArchetypeRadarProps) {
  return (
    <RadarChart width={300} height={300} data={data} outerRadius="70%">
      <PolarGrid />
      <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
      <Radar
        name={name}
        dataKey={slug}
        stroke="#4F46E5"
        fill="#4F46E5"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}
