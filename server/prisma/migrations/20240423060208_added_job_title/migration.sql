/*
  Warnings:

  - You are about to drop the column `image_url` on the `Menu` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `Storage` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - Added the required column `image_url` to the `MenuDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `MenuDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Menu` DROP COLUMN `image_url`;

-- AlterTable
ALTER TABLE `MenuDetails` ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `Storage` MODIFY `quantity` DECIMAL(65, 30) NOT NULL;
