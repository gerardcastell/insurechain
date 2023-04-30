import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const thirdPartyLiability = await prisma.coverageType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      identifier: 'third_party_liability',
      order: 1,
      title: 'Obligatory third party liability',
      description:
        'Compulsory coverage to circulate. It covers the compensation she is responsible for to damages caused to third parties in a traffic accident, both material and personal damages.',
      monthlyPremium: 100,
      params: {
        create: {
          identifier: 'prueba',
          default: '100',
          values: ['100', '200', '300', '400'],
          title: 'Prueba',
        },
      },
    },
  });

  console.log({ thirdPartyLiability });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
