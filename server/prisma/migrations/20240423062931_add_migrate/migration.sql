/*
  Warnings:

  - Added the required column `ingredient_weight` to the `DrinksDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DrinksDetails` ADD COLUMN `ingredient_weight` DECIMAL(65, 30) NOT NULL;
