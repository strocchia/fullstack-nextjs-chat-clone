/*
  Warnings:

  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_chanId_fkey";

-- DropTable
DROP TABLE "Channel";

-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "chan_name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tweets" ADD FOREIGN KEY ("chanId") REFERENCES "channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
