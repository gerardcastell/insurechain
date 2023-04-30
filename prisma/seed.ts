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
        premiumFactor: coverageType.premium.monthly_plan.receipt_amount / 10,
        params: {
          create: [
            ...coverageType.params.map((param: any) => ({
              identifier: param.identifier,
              default: param.default,
              values: param.values,
              choices: {
                create: [
                  ...param.choices?.map((choice: any) => ({
                    identifier: choice.identifier,
                    title: choice.title.en,
                    description: choice.description.en,
                  })),
                ],
              },
            })),
          ],
        },
      },
    })
  );
  const upsertedCoverageTypes = coverageTypes.map(
    async (c) => await prisma.coverageType.upsert(c)
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
