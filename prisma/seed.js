const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const raw = process.env.ADMIN_EMAILS;
  if (!raw) {
    throw new Error("ADMIN_EMAILS env var not set (e.g. 'agent@plebs.net,outie@eplebs.net,innie@plebs.net')");
  }

  const emails = raw.split(",").map((e) => e.trim()).filter(Boolean);
  if (emails.length === 0) {
    throw new Error("ADMIN_EMAILS was empty after parsing");
  }

  for (const email of emails) {
    try {
      const user = await prisma.user.upsert({
        where: { email },
        update: { role: "ADMIN" },     // or "admin" if you use a String enum
        create: {
          email,
          role: "ADMIN",
          name: email.split("@")[0],
        },
      });
      console.log(`✅ Admin ensured: ${user.email} (id: ${user.id})`);
    } catch (e) {
      console.error(`❌ Failed to upsert admin ${email}:`, e);
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
