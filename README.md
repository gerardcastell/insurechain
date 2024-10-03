# Insurechain

Insurechain is DAPP solution which consists on a technological ecosystem that builds the next generation of Web3 insurance.
[You may find the project slides here.](https://slides.com/gerardcastell/development-of-a-dapp)
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

---

### Production Database

In order to use a production database you just have to define the .env.production file
setting the `DATABASE_URL` variable you may run the same commands with the prod config:

```bash
npm run db:up:dev
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

## Blockchain Commands

### Local Blockchain with Hardhat

To init the local blockchain network and automatically deploy the smart contracts we just have to run:

```bash
npm run hh:start
```

This will serve the hardhat network at http://127.0.0.1:8545/ and when network pings it will deploy the contracts to such network using the account generated by Hardhat.

---

To init the local blockchain we have to run:

```bash
npm run hh:network
```

This will run a node server on port 8545 to simulate the blockchain.
It will provide 20 accounts with 10000 ETH each one which you can import to your wallet or DAPP.
If you want to import them to your Metamask wallet you can follow this [tutorial](https://medium.com/@kaishinaw/connecting-metamask-with-a-local-hardhat-network-7d8cea604dc6).

---

To deploy contracts we must use the deploy script located at _"scripts/deploy.ts"_. We must modify such script to add our contracts. Take into account that local network server must be running. Then, we can deploy our contracts running:

```bash
npm run hh:deploy
```

---

To write tests we should locate them at _"test/"_. Then, we can run them with:

```bash
npm run hh:test
```

---

To compile contracts we must ensure they are located at _"contracts/"_. Then, we can compile them running:

```bash
npm run hh:compile
```

---
