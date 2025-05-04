import { PrismaClient } from "@prisma/client";
import kmeans from "ml-kmeans"; // or any clustering lib

async function runAudit() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({ where: { answers: { not: null } } });

  // Extract answer vectors
  const data = users.map(u => Object.values(u.answers).map(Number));

  // Run K-means for k=9–12, track inertia / silhouette
  for (let k = 9; k <= 12; k++) {
    const { clusters, centroids } = kmeans(data, k);
    console.log(`k=${k}`, centroids);
    // Optionally store cluster assignments for review
    await prisma.clusterAudit.create({ data: { k, createdAt: new Date(), centroids: centroids.map(c => c.centroid) } });
  }

  prisma.$disconnect();
}

runAudit();
