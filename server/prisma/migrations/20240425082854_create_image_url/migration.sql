/*
  Warnings:

  - You are about to drop the column `image_url` on the `MenuDetails` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `MenuDetails` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `Drink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Drink` ADD COLUMN `image_url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MenuDetails` DROP COLUMN `image_url`,
    DROP COLUMN `price`;
