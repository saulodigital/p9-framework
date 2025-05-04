import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { archetype, answers } = await request.json();

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        archetype,
        answers,
        lastAssessedAt: new Date(),
        completedAt: new Date(),
        sessions: { increment: 1 },
      },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error saving results:", err);
    return NextResponse.json({ error: "Failed to save results" }, { status: 500 });
  }
}
