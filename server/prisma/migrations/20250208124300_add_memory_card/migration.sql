/*
  Warnings:

  - A unique constraint covering the columns `[memoryCardId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId]` on the table `MemoryCard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `MemoryCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "memoryCardId" INTEGER;

-- AlterTable
ALTER TABLE "MemoryCard" ADD COLUMN     "email" TEXT NOT NULL,
ADD CONSTRAINT "MemoryCard_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "MemoryCard_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Event_memoryCardId_key" ON "Event"("memoryCardId");

-- CreateIndex
CREATE UNIQUE INDEX "MemoryCard_eventId_key" ON "MemoryCard"("eventId");

-- AddForeignKey
ALTER TABLE "MemoryCard" ADD CONSTRAINT "MemoryCard_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryCard" ADD CONSTRAINT "MemoryCard_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
