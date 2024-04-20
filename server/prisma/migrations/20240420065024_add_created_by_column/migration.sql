/*
  Warnings:

  - You are about to drop the column `created_by` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Storage` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bill` DROP COLUMN `created_by`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Storage` DROP COLUMN `created_by`,
    ADD COLUMN `user_id_deleted` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Storage` ADD CONSTRAINT `Storage_user_id_deleted_fkey` FOREIGN KEY (`user_id_deleted`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
