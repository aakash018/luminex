/*
  Warnings:

  - You are about to drop the column `cover` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookKey` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverKey` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "cover",
DROP COLUMN "location",
ADD COLUMN     "bookKey" TEXT NOT NULL,
ADD COLUMN     "coverKey" TEXT NOT NULL;
