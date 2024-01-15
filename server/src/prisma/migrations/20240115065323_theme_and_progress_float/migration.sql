-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('dark', 'light');

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "progress" SET DEFAULT 0.0,
ALTER COLUMN "progress" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'dark';
