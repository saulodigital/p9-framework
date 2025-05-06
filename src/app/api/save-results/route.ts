import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export interface SaveResultsPayload {
  testId: string;
  email: string;
  archetype: string;
  answers: Record<string, number>;
  ethAddress?: string;
}

export async function POST(request: Request) {
  let payload: SaveResultsPayload;

  // Parse & basic shape check
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed JSON" },
      { status: 400 }
    );
  };

  const { testId, email, archetype, answers, ethAddress } = payload;

  // Validate testId
  if (typeof testId !== "string" || testId.trim() === "") {
    return NextResponse.json(
      { error: "Missing or invalid testId" },
      { status: 400 }
    );
  };

  // Validate email
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  };

  // Validate archetype
  if (typeof archetype !== "string" || archetype.trim() === "") {
    return NextResponse.json(
      { error: "Invalid archetype" },
      { status: 400 }
    );
  };

  // Validate answers
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
  };

  // Validate optional ethAddress
  if (
    ethAddress !== undefined &&
    !/^0x[a-fA-F0-9]{40}$/.test(ethAddress)
  ) {
    return NextResponse.json(
      { error: "Invalid Ethereum address" },
      { status: 400 }
    );
  };

  const now = new Date();

  try {
    // Upsert user record (increment sessionCount)
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

    // Check if assessment with this testId already exists
    const existing = await prisma.assessment.findUnique({
      where: { userId_testId: { userId: user.id, testId } },
    });

    if (existing) {
      return NextResponse.json({ success: true, alreadySaved: true });
    };
    
    // Create the new assessment
    await prisma.assessment.create({
      data: {
        testId,
        userId: user.id,
        archetype,
        answers,
      },
    });

    // Return success
    return NextResponse.json({
      success: true,
      alreadySaved: false
    });
  } catch (err: any) {
    console.error("Error saving results:", err);
    return NextResponse.json(
      { error: "Failed to save results" },
      { status: 500 }
    );
  };
};