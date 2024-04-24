/*
  Warnings:

  - You are about to alter the column `ingredient_weight` on the `DrinksDetails` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `DrinksDetails` MODIFY `ingredient_weight` DOUBLE NOT NULL;
