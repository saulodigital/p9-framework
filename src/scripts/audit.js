import { PrismaClient } from "@prisma/client";
import kmeans from "ml-kmeans";
import silhouette from "ml-silhouette";
import dotenv from "dotenv";

dotenv.config();

async function runAudit() {
  const prisma = new PrismaClient();
  try {
    // 1. Fetch users with answers
    const users = await prisma.user.findMany({
      where: { answers: { not: null } },
      select: { id: true, answers: true },
    });

    if (users.length === 0) {
      console.log("No users with answers found. Exiting.");
      return;
    }

    // 2. Build data matrix and validate
    const answerKeys = Object.keys(users[0].answers);
    const data = users.map((u) => {
      const vec = answerKeys.map((k) => Number(u.answers[k]));
      if (vec.some(isNaN)) {
        throw new Error(`Invalid answer vector for user ${u.id}`);
      }
      return vec;
    });

    // 3. Try k in range and record metrics
    for (let k = 9; k <= 12; k++) {
      console.log(`\n=== Running k-means with k=${k} ===`);
      const result = kmeans(data, k, { seed: 42 });

      const centroids = result.centroids.map((c) => c.centroid);
      console.log(`Centroids for k=${k}:`, centroids);

      // Compute silhouette score if available
      let silScore = null;
      try {
        silScore = silhouette(data, result.clusters);
        console.log(`Silhouette score for k=${k}:`, silScore.toFixed(4));
      } catch (e) {
        console.warn("Silhouette computation failed:", e.message);
      }

      // Inertia (sum of squared distances)
      const inertia = result.computeInformation().withinss.reduce((a, b) => a + b, 0);
      console.log(`Inertia for k=${k}:`, inertia.toFixed(4));

      // 4. Upsert audit record
      await prisma.clusterAudit.upsert({
        where: { k },
        update: {
          centroids: centroids,
          silhouette: silScore,
          inertia,
          updatedAt: new Date(),
        },
        create: {
          k,
          centroids,
          silhouette: silScore,
          inertia,
          createdAt: new Date(),
        },
      });
    }
  } catch (err) {
    console.error("Audit script failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

runAudit();
