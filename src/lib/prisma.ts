import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances of Prisma Client in development
  // https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  // Enable detailed logging in development
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Optional: gracefully close Prisma on process termination
if (typeof process !== "undefined" && process.on) {
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

export default prisma;
