/*
  Warnings:

  - You are about to drop the column `salarayRange` on the `Position` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryRange` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "salarayRange",
ADD COLUMN     "salaryRange" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL;
