/*
  Warnings:

  - You are about to alter the column `cost_price` on the `Storage` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `quantity` on the `Storage` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Storage` MODIFY `cost_price` DOUBLE NOT NULL,
    MODIFY `quantity` DOUBLE NOT NULL;
