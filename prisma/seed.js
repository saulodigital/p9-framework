require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Expect comma-separated list in env var, e.g. "agent@plebs.net,outie@eplebs.net,innie@plebs.net"
  const raw = process.env.ADMIN_EMAILS;
  if (!raw) {
    throw new Error("ADMIN_EMAILS env var not set (e.g. 'alice@x.com,bob@x.com')");
  }

  const admins = raw.split(",").map((e) => e.trim()).filter(Boolean);
  if (admins.length === 0) {
    throw new Error("ADMIN_EMAILS was empty after parsing");
  }

  for (const email of admins) {
    try {
      const [user] = await prisma.user.upsert({
        where: { email },
        update: { role: "ADMIN" },
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
