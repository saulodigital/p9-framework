import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const SIX_MONTHS_IN_MS = 1000 * 60 * 60 * 24 * 180;

export async function GET() {
  // 1) Authenticate user  
  const session = await auth();
  if (!session?.user?.email) {
    return new NextResponse(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    );
  }

  // 2) Fetch last assessment timestamp
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { lastAssessedAt: true },
  });

  // 3) Determine due-status  
  const lastTs = user?.lastAssessedAt?.getTime() ?? 0;
  const due = Date.now() - lastTs > SIX_MONTHS_IN_MS;

  // 4) Return result  
  return new NextResponse(
    JSON.stringify({ due }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Force revalidation — you may adjust or remove this:
        "Cache-Control": "no-store"
      }
    }
  );
}
