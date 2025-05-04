"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface ArchetypeCount {
  name: string;
  value: number;
}

interface UserStats {
  totalUsers: number;
  completedCount: number;
  recentSignups: number;
  completionRate: number; // percentage 0–100
}

export default function Dashboard() {
  const [archetypeData, setArchetypeData] = useState<ArchetypeCount[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    completedCount: 0,
    recentSignups: 0,
    completionRate: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setArchetypeData(data.archetypes || []);
        setUserStats({
          totalUsers: data.userStats.totalUsers ?? 0,
          completedCount: data.userStats.completedCount ?? 0,
          recentSignups: data.userStats.recentSignups ?? 0,
          completionRate: data.userStats.completionRate ?? 0,
        });
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      }
    }
    fetchStats();
  }, []);

  // Prepare data for the grouped bar chart (total vs. completed)
  const submissionData = [
    {
      name: "Users",
      total: userStats.totalUsers,
      completed: userStats.completedCount,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Archetype Distribution */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Archetype Distribution</h2>
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            data={archetypeData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#4F46E5"
            label
          />
          <RechartsTooltip />
          <RechartsLegend />
        </PieChart>
      </section>

      {/* User Submissions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">User Submissions</h2>
        <BarChart
          width={400}
          height={300}
          data={submissionData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <RechartsLegend />
          <Bar dataKey="total" name="Total Users" fill="#82ca9d" />
          <Bar dataKey="completed" name="Completed" fill="#8884d8" />
        </BarChart>
      </section>

      {/* Recent Sign-ups & Completion Rate */}
      <section className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded shadow text-center">
          <h3 className="text-lg font-medium">Recent Sign-ups (30d)</h3>
          <p className="text-3xl font-bold">{userStats.recentSignups}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded shadow text-center">
          <h3 className="text-lg font-medium">Completion Rate</h3>
          <p className="text-3xl font-bold">{userStats.completionRate.toFixed(1)}%</p>
        </div>
      </section>
    </div>
  );
}
