/*
  Warnings:

  - Added the required column `fileKey` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileKey` to the `UploadImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "fileKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UploadImage" ADD COLUMN     "fileKey" TEXT NOT NULL;
