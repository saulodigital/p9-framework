import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface SaveResultsPayload {
  email: string;
  archetype: string;
  answers: Record<string, number>;
}

export async function POST(request: Request) {
  let payload: SaveResultsPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed JSON" },
      { status: 400 }
    );
  }

  const { email, archetype, answers } = payload;

  // Basic validation
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }
  if (typeof archetype !== "string") {
    return NextResponse.json(
      { error: "Invalid archetype" },
      { status: 400 }
    );
  }
  if (
    typeof answers !== "object" ||
    answers === null ||
    Array.isArray(answers) ||
    !Object.values(answers).every((v) => typeof v === "number")
  ) {
    return NextResponse.json(
      { error: "Invalid answers payload" },
      { status: 400 }
    );
  }

  const now = new Date();
  try {
    await prisma.user.upsert({
      where: { email },
      update: {
        archetype,
        answers,
        lastAssessedAt: now,
        completedAt: now,
        sessions: { increment: 1 },
      },
      create: {
        email,
        archetype,
        answers,
        lastAssessedAt: now,
        completedAt: now,
        sessions: 1,
      },
    });

    return new NextResponse(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Error saving results:", err);
    return NextResponse.json(
      { error: "Failed to save results" },
      { status: 500 }
    );
  }
}
