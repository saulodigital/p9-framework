import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { label, rating } = await request.json();

    // Basic input validation
    if (typeof label !== "string" || (rating !== 0 && rating !== 1)) {
      return NextResponse.json(
        { error: "Invalid input: label must be string and rating must be 0 or 1" },
        { status: 400 }
      );
    }

    await prisma.labelFeedback.create({
      data: {
        label,
        rating,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error saving label feedback:", err);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}
