/*
  Warnings:

  - Added the required column `accountId` to the `AccountHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountHistory" ADD COLUMN     "accountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AccountHistory" ADD CONSTRAINT "AccountHistory_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
