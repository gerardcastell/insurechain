-- CreateEnum
CREATE TYPE "VerticalProduct" AS ENUM ('CAR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" SERIAL NOT NULL,
    "policyHolderId" INTEGER NOT NULL,
    "vertical" "VerticalProduct" NOT NULL,
    "coverages" JSONB NOT NULL,
    "active" BOOLEAN DEFAULT false,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_policyHolderId_fkey" FOREIGN KEY ("policyHolderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
