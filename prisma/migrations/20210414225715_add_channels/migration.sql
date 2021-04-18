-- AlterTable
ALTER TABLE "tweets" ADD COLUMN     "chanId" INTEGER;

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "chan_name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tweets" ADD FOREIGN KEY ("chanId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
