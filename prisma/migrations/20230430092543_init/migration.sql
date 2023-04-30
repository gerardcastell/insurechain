-- CreateEnum
CREATE TYPE "CoverageTypeIdentifier" AS ENUM ('FireWindscreen', 'Theft', 'ThirdPartyLiability', 'WildlifeCollision');

-- CreateEnum
CREATE TYPE "DependencyOperand" AS ENUM ('AND', 'OR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "licenseType" TEXT,
    "documentNumber" TEXT,
    "birthdate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" SERIAL NOT NULL,
    "policyHolderId" INTEGER NOT NULL,
    "coverages" JSONB NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "onBlockchain" BOOLEAN DEFAULT false,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskObject" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "plate" TEXT NOT NULL,
    "kmsYear" INTEGER NOT NULL,
    "parking" TEXT NOT NULL,
    "proposalId" INTEGER NOT NULL,

    CONSTRAINT "RiskObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskSubject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "licenseType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "proposalId" INTEGER NOT NULL,

    CONSTRAINT "RiskSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverageType" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "order" INTEGER,
    "monthlyPremium" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CoverageType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Param" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "default" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "values" TEXT[],
    "coverageTypeId" INTEGER NOT NULL,

    CONSTRAINT "Param_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RiskObject_proposalId_key" ON "RiskObject"("proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "RiskSubject_proposalId_key" ON "RiskSubject"("proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "CoverageType_identifier_key" ON "CoverageType"("identifier");

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_policyHolderId_fkey" FOREIGN KEY ("policyHolderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskObject" ADD CONSTRAINT "RiskObject_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskSubject" ADD CONSTRAINT "RiskSubject_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Param" ADD CONSTRAINT "Param_coverageTypeId_fkey" FOREIGN KEY ("coverageTypeId") REFERENCES "CoverageType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
