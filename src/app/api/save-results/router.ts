import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  // Authenticate the user
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Parse request body
  const { archetype, answers } = await request.json();

  // Update the user record
  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        archetype,
        answers,
        lastAssessedAt: new Date(),
        completedAt: new Date(),
        // Optionally increment sessions
        sessions: { increment: 1 },
      },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error saving results:", err);
    return NextResponse.json(
      { error: "Failed to save results" },
      { status: 500 }
    );
  }
}
