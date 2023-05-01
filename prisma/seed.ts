//Script to read from quote.json file and generate the seed file for the database
import { readFileSync } from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const json: { data: any } = JSON.parse(
    readFileSync(join(__dirname, 'quote.json'), 'utf8')
  );
  const coverageTypes: any[] = json.data.coverage_types.map(
    (coverageType: any) => ({
      where: { identifier: coverageType.identifier },
      update: {},
      create: {
        identifier: coverageType.identifier,
        order: coverageType.order,
        title: coverageType.title.en,
        description: coverageType.description.en,
        basePriceFactor: coverageType.premium.monthly_plan.receipt_amount / 10,
      },
    })
  );
  const upsertedCoverageTypes = coverageTypes.map(
    async (c) => await prisma.coverageProduct.upsert(c)
  );
  console.log(
    upsertedCoverageTypes.reduce((acc, curr) => ({ ...acc, curr }), {})
  );
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
