/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `catalogues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "catalogues" DROP COLUMN "deleted_at";
