const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const adminEmails = [
    "agent@plebs.net"
  ];

  for (const email of adminEmails) {
    await prisma.user.upsert({
      where: { email },
      update: { role: "admin" },
      create: {
        email,
        role: "admin",
        name: email.split("@")[0],
      },
    });
    console.log(`Ensured admin user: ${email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
