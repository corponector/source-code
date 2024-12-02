/*
  Warnings:

  - The `links` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `emails` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "links",
ADD COLUMN     "links" TEXT[],
DROP COLUMN "emails",
ADD COLUMN     "emails" TEXT[];
