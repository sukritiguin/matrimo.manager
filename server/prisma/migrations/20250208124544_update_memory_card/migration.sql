/*
  Warnings:

  - You are about to drop the column `memoryCardId` on the `Event` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Event_memoryCardId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "memoryCardId";
