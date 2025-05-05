"use client";

import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

interface Props {
  data: { dimension: string; score: number }[];
}

export default function DimensionRadar({ data }: Props) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius={120}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis
            angle={30}
            domain={[-3, 3]}
            tickCount={7}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="You"
            dataKey="score"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
