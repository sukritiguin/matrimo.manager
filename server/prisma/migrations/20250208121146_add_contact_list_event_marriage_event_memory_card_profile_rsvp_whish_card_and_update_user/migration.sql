-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE', 'LGBTQ');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WEDDING', 'BIRTHDAY', 'ANNIVERSARY', 'RICE_CEREMONY');

-- CreateEnum
CREATE TYPE "FORWHOME" AS ENUM ('GROOM', 'BRIDE');

-- CreateEnum
CREATE TYPE "FILETYPE" AS ENUM ('PHOTO', 'VIDEO');

-- CreateEnum
CREATE TYPE "AttendingOption" AS ENUM ('YES', 'NO', 'TENTATIVE');

-- CreateTable
CREATE TABLE "ContactList" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "GENDER" NOT NULL,
    "mobileNumber" TEXT NOT NULL,

    CONSTRAINT "ContactList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL,
    "eventId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarriageEvent" (
    "id" SERIAL NOT NULL,
    "forWhome" "FORWHOME" NOT NULL,
    "groomName" TEXT NOT NULL,
    "groomFatherName" TEXT NOT NULL,
    "groomMotherName" TEXT NOT NULL,
    "brideName" TEXT NOT NULL,
    "brideFatherName" TEXT NOT NULL,
    "brideMotherName" TEXT NOT NULL,
    "venueAddress" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventTime" TEXT NOT NULL,
    "venueMapRef" TEXT NOT NULL,
    "themeId" INTEGER,
    "themeName" TEXT NOT NULL,

    CONSTRAINT "MarriageEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryCard" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "fileType" "FILETYPE" NOT NULL,
    "fileURL" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profilePicURL" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "RSVP" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "attendingOption" "AttendingOption" NOT NULL,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishCard" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "wish" TEXT NOT NULL,

    CONSTRAINT "WishCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventId_key" ON "Event"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "MemoryCard_id_key" ON "MemoryCard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "ContactList" ADD CONSTRAINT "ContactList_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarriageEvent" ADD CONSTRAINT "MarriageEvent_id_fkey" FOREIGN KEY ("id") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RSVP" ADD CONSTRAINT "RSVP_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishCard" ADD CONSTRAINT "WishCard_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishCard" ADD CONSTRAINT "WishCard_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
