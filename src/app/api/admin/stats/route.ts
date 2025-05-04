import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

// Define the shape of the data we select from Prisma
interface UserRecord {
  archetype: string | null;
  answers: unknown;
  createdAt: Date;
  completedAt: Date | null;
}

export async function GET(request: Request) {
  // Authenticate admin
  const session = await auth();
  if (!session?.user?.email || session.user.email !== "admin@example.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch only the needed fields
  const users: UserRecord[] = await prisma.user.findMany({
    select: {
      archetype: true,
      answers: true,
      createdAt: true,
      completedAt: true,
    },
  });

  const totalUsers = users.length;
  const completedCount = users.filter((u) => u.answers != null).length;

  // Build simple archetype counts
  const archetypeCounts: Record<string, number> = {};
  users.forEach((u: UserRecord) => {
    if (u.archetype) {
      archetypeCounts[u.archetype] = (archetypeCounts[u.archetype] || 0) + 1;
    }
  });
  const archetypes = Object.entries(archetypeCounts).map(([name, value]) => ({ name, value }));

  // Recent signups in last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
  const recentSignups = await prisma.user.count({
    where: { createdAt: { gte: thirtyDaysAgo } },
  });

  // Archetype distribution via grouping
  const archetypeDistribution = await prisma.user.groupBy({
    by: ["archetype"],
    _count: { archetype: true },
  });

  // Completion rate
  const completionRate = totalUsers > 0 ? (completedCount / totalUsers) * 100 : 0;

  return NextResponse.json({
    userStats: {
      totalUsers,
      completedCount,
      completionRate,
      recentSignups,
    },
    archetypes,             // simple counts per archetype
    archetypeDistribution, // detailed grouping data
  });
}
