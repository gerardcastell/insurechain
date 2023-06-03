# Insurechain

Insurechain is DAPP solution which consists on a technological ecosystem that builds the next generation of Web3 insurance.

## Stacks

- Frontend: Next.js
- Backend: Nest.js
- Database: Prisma and PostgreSQL
- Blockchain: Ethereum
- Tokens: Ethereum ERC20
- Smart Contracts: Solidity

## Database Commands

### Local Database

To init the database locally first we have to run the docker container with the database:

```bash
npm run db:up:dev
```

To seed the database:

```bash
npm run db:seed:dev
```

In order to perform a migration, let's suppose the schema is already edited. Take into account that on init the database the seed is already performed automatically. To migrate we may run:

```bash
prisma migrate dev --name migration_title
```

Even if we have to init for the first time the database or we have perform some modifications and we want to run the migrations we have to run the following command:

```bash
npm run db:migrate:dev
```

To reset our database with the seed:

```bash
rm -rf prisma/migrations && npm run db:migrate:dev
```

We can use the Prisma Studio to visualize the data of our database:

```bash
npm run db:studio:dev
```

### Production Database

In order to use a production database you just have to define the .env.production file
setting the `DATABASE_URL` variable you may run the same commands with the prod config:

```bash
npm run db:up:prod
npm run db:migrate:prod
npm run db:studio:prod
```

If we want to update the production database schema and tables with the local tables we have to run:

```bash
prisma db push
```

By contrast, if we want to pull the production schema and tables to our local we have to run:

```bash
prisma db pull
```
