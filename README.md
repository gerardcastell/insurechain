# Insurechain

Insurechain is DAPP which consists on a technological ecosystem that pursuits to build the next generation of Web3 insurance.

## Stacks

Technologies used:

- Frontend: Next.js
- Backend: Nest.js
- Database: Prisma and PostgreSQL
- Blockchain: Ethereum
- Tokens: Ethereum ERC20
- Smart Contracts: Solidity

## Database Commands

To init the database locally first we have to run the docker container with the database:

```bash
npm run db:up:dev
```

Even if we have to init for the first time the database or we have perform some modifications and we want to run the migrations we have to run the following command:

```bash
npm run db:migrate:dev
```

We can use the Prisma Studio to visualize the data of our database:

```bash
npm run db:studio:dev
```

In order to use a production database you just have to define the .env.production file
setting the `DATABASE_URL` variable you may run the same commands with the prod config:

```bash
npm run db:up:prod
npm run db:migrate:prod
npm run db:studio:prod
```
