"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

interface ClientRadarProps {
  data: any[];
  dataKey: string;
  name: string;
}

export default function ClientRadar({ data, dataKey, name }: ClientRadarProps) {
  return (
    <RadarChart width={160} height={160} data={data} outerRadius="70%">
      <PolarGrid />
      <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
      <Radar name={name} dataKey={dataKey} stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
    </RadarChart>
  );
}
