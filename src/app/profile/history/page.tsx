// app/profile/history/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return <p className="p-6">Please sign in to view your history.</p>;
  }

  const runs = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      // assuming you track multiple assessments separately
      assessments: { orderBy: { createdAt: "desc" } },
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Your Assessment History</h2>
      <ul>
        {runs?.assessments.map((run) => (
          <li key={run.id} className="p-4 border rounded mb-2">
            <p><strong>Date:</strong> {new Date(run.createdAt).toLocaleDateString()}</p>
            <p><strong>Archetype:</strong> {run.archetype}</p>
            {/* Link back to results? */}
          </li>
        ))}
      </ul>
    </div>
  );
}
