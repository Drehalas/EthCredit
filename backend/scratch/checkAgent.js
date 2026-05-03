const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const agents = await prisma.agent.findMany({
    select: {
      agentId: true,
      name: true,
      internalWalletAddress: true
    }
  });
  console.log(JSON.stringify(agents, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
