/*
  Warnings:

  - Added the required column `profileImage` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "profileImage" TEXT NOT NULL;
