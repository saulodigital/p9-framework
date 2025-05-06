import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export interface SaveResultsPayload {
  email: string;
  archetype: string;
  answers: Record<string, number>;
  ethAddress?: string;
}

export async function POST(request: Request) {
  let payload: SaveResultsPayload;
  
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }

  const { email, archetype, answers, ethAddress } = payload;

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (typeof archetype !== "string") {
    return NextResponse.json({ error: "Invalid archetype" }, { status: 400 });
  }

  if (
    typeof answers !== "object" ||
    answers === null ||
    Array.isArray(answers) ||
    !Object.values(answers).every((v) => typeof v === "number")
  ) {
    return NextResponse.json({ error: "Invalid answers payload" }, { status: 400 });
  }

  if (ethAddress !== undefined && !/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
    return NextResponse.json({ error: "Invalid Ethereum address" }, { status: 400 });
  }

  const now = new Date();

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        archetype,
        answers,
        lastAssessedAt: now,
        completedAt: now,
        sessionCount: { increment: 1 },
        ...(ethAddress && { ethAddress }),
      },
      create: {
        email,
        archetype,
        answers,
        lastAssessedAt: now,
        completedAt: now,
        sessionCount: 1,
        ethAddress,
      },
    });

    await prisma.assessment.create({
      data: {
        userId: user.id,
        archetype,
        answers,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error saving results:", err);
    return NextResponse.json({ error: "Failed to save results" }, { status: 500 });
  }
}
