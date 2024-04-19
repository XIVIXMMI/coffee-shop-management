/*
  Warnings:

  - Added the required column `created_by` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Storage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bill` ADD COLUMN `created_by` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Storage` ADD COLUMN `created_by` DATETIME(3) NOT NULL;
