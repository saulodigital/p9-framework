import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  // Authenticate the user
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Look up the user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { lastAssessedAt: true },
  });

  // Compute whether they’re due (6 months = ~180 days)
  const last = user?.lastAssessedAt?.getTime() ?? 0;
  const now = Date.now();
  const sixMonthsMs = 1000 * 60 * 60 * 24 * 180;
  const due = now - last > sixMonthsMs;

  return NextResponse.json({ due });
}
