-- CreateEnum
CREATE TYPE "Coverage" AS ENUM ('third_party_liability', 'wildlife_collision', 'theft', 'roadside_assistance', 'fire_windscreen', 'vehicle_damages', 'replacement_vehicle');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('gasoline', 'diesel', 'hybrid', 'electric');

-- CreateEnum
CREATE TYPE "ParkingType" AS ENUM ('street', 'collective_car_park', 'collective_car_park_surveillance', 'garage');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLegacy" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserLegacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" SERIAL NOT NULL,
    "policyHolderId" INTEGER NOT NULL,
    "riskSubjectId" INTEGER NOT NULL,
    "smartContractAddress" TEXT,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskObject" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "plate" TEXT NOT NULL,
    "kmsYear" INTEGER NOT NULL,
    "numberDoors" INTEGER NOT NULL,
    "maker" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "retailPrice" DOUBLE PRECISION NOT NULL,
    "version" TEXT NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "parking" "ParkingType" NOT NULL,
    "proposalId" INTEGER NOT NULL,

    CONSTRAINT "RiskObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskSubject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiskSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverageProduct" (
    "id" SERIAL NOT NULL,
    "identifier" "Coverage" NOT NULL,
    "basePriceFactor" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CoverageProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverageType" (
    "id" SERIAL NOT NULL,
    "identifier" "Coverage" NOT NULL,
    "monthlyPremium" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "proposalId" INTEGER NOT NULL,

    CONSTRAINT "CoverageType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "UserLegacy_email_key" ON "UserLegacy"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_smartContractAddress_key" ON "Proposal"("smartContractAddress");

-- CreateIndex
CREATE UNIQUE INDEX "RiskObject_proposalId_key" ON "RiskObject"("proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "RiskSubject_documentNumber_key" ON "RiskSubject"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CoverageProduct_identifier_key" ON "CoverageProduct"("identifier");

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_policyHolderId_fkey" FOREIGN KEY ("policyHolderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_riskSubjectId_fkey" FOREIGN KEY ("riskSubjectId") REFERENCES "RiskSubject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskObject" ADD CONSTRAINT "RiskObject_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverageType" ADD CONSTRAINT "CoverageType_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
