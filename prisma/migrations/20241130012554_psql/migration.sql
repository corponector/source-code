/*
  Warnings:

  - The `jobType` column on the `Position` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Position" DROP COLUMN "jobType",
ADD COLUMN     "jobType" TEXT[];

-- DropEnum
DROP TYPE "JobType";
