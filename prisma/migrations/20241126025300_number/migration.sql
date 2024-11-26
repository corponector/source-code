/*
  Warnings:

  - Changed the type of `salaryRange` on the `Position` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Position" DROP COLUMN "salaryRange",
ADD COLUMN     "salaryRange" INTEGER NOT NULL;
