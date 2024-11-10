/*
  Warnings:

  - You are about to drop the column `parentId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_parentId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "parentId";
