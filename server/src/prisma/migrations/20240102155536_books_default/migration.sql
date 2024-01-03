/*
  Warnings:

  - You are about to drop the column `bookKey` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `coverKey` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookURL` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverURL` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "bookKey",
DROP COLUMN "coverKey",
ADD COLUMN     "bookURL" TEXT NOT NULL,
ADD COLUMN     "coverURL" TEXT NOT NULL;
