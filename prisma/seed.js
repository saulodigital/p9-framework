// prisma/seed.js

const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const raw = process.env.ADMIN_EMAILS;
  if (!raw) {
    throw new Error(
      "ADMIN_EMAILS env var not set; e.g. ADMIN_EMAILS='agent@plebs.net,outie@plebs.net'"
    );
  }

  const emails = raw
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);

  if (emails.length === 0) {
    throw new Error("ADMIN_EMAILS was empty after parsing");
  }

  for (const email of emails) {
    try {
      const user = await prisma.user.upsert({
        where: { email },
        update: { role: Role.ADMIN },
        create: {
          email,
          role: Role.ADMIN,
          name: email.split("@")[0],
        },
      });
      console.log(`✅ Admin ensured: ${user.email} (id: ${user.id})`);
    } catch (err) {
      console.error(`❌ Failed to upsert admin ${email}:`, err);
      process.exitCode = 1;
    }
  }
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
