import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return new NextResponse(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { label, rating } = payload as {
    label?: unknown;
    rating?: unknown;
  };

  // Basic input validation
  if (
    typeof label !== "string" ||
    label.trim().length === 0 ||
    (rating !== 0 && rating !== 1)
  ) {
    return new NextResponse(
      JSON.stringify({
        error: "Invalid input: label must be non-empty string and rating must be 0 or 1",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await prisma.labelFeedback.create({
      data: {
        label: label.trim(),
        rating,
      },
    });

    return new NextResponse(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Error saving label feedback:", err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to save feedback" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
