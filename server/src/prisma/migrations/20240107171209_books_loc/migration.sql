/*
  Warnings:

  - You are about to drop the column `pagesRead` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `totalPages` on the `Book` table. All the data in the column will be lost.
  - Added the required column `progress` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "pagesRead",
DROP COLUMN "totalPages",
ADD COLUMN     "progress" INTEGER NOT NULL;
