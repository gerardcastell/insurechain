-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RiskObject_proposalId_key" ON "RiskObject"("proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "RiskSubject_proposalId_key" ON "RiskSubject"("proposalId");

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_policyHolderId_fkey" FOREIGN KEY ("policyHolderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskObject" ADD CONSTRAINT "RiskObject_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskSubject" ADD CONSTRAINT "RiskSubject_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
