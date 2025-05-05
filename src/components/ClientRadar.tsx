// components/ClientRadar.tsx
"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { Centroid } from "@/lib/archetypeCentroids";

interface Props {
  data: Centroid[];   // array of { dimension, [slug]: number }
  slug: string;       // key in each object to extract the score
  name: string;       // for the legend
}

export default function ClientRadar({ data, slug, name }: Props) {
  // reshape into [{ dimension, score }, …]
  const chartData = data.map((item) => ({
    dimension: item.dimension,
    // Type assertion because Centroid has an index signature
    score: item[slug] as number,
  }));

  return (
    <RadarChart width={120} height={120} data={chartData} outerRadius="70%">
      <PolarGrid />
      <PolarAngleAxis dataKey="dimension" tick={false} />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
      <Radar
        name={name}
        dataKey="score"
        stroke="#4F46E5"
        fill="#4F46E5"
        fillOpacity={0.6}
      />
      <Tooltip />
    </RadarChart>
  );
}
