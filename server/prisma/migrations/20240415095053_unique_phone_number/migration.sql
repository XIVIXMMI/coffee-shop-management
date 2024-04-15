-- CreateTable
CREATE TABLE `Storage` (
    `storage_id` INTEGER NOT NULL AUTO_INCREMENT,
    `goods_name` VARCHAR(191) NOT NULL,
    `arrival_date` DATETIME(3) NOT NULL,
    `cost_price` DECIMAL(65, 30) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `goods_unit` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`storage_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoffeeBrewingTool` (
    `brewingTool_id` INTEGER NOT NULL AUTO_INCREMENT,
    `storage_id` INTEGER NOT NULL,
    `brewingtool_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`brewingTool_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopEquipment` (
    `equipment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `storage_id` INTEGER NOT NULL,
    `equipmenttype_id` INTEGER NOT NULL,
    `equipment_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`equipment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipmentType` (
    `equipmenttype_id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipmenttype_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`equipmenttype_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `ingredient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `storage_id` INTEGER NOT NULL,
    `ingredient_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ingredient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DrinksDetails` (
    `drink_id` INTEGER NOT NULL,
    `ingredient_id` INTEGER NOT NULL,

    PRIMARY KEY (`drink_id`, `ingredient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drink` (
    `drink_id` INTEGER NOT NULL AUTO_INCREMENT,
    `drink_name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`drink_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuDetails` (
    `menu_id` INTEGER NOT NULL,
    `drink_id` INTEGER NOT NULL,

    PRIMARY KEY (`menu_id`, `drink_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bill` (
    `bill_id` INTEGER NOT NULL AUTO_INCREMENT,
    `staff_id` INTEGER NOT NULL,
    `bill_date` DATETIME(3) NOT NULL,
    `total_price` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`bill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BillDetails` (
    `bill_id` INTEGER NOT NULL,
    `drink_id` INTEGER NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`bill_id`, `drink_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Storage` ADD CONSTRAINT `Storage_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoffeeBrewingTool` ADD CONSTRAINT `CoffeeBrewingTool_storage_id_fkey` FOREIGN KEY (`storage_id`) REFERENCES `Storage`(`storage_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopEquipment` ADD CONSTRAINT `ShopEquipment_storage_id_fkey` FOREIGN KEY (`storage_id`) REFERENCES `Storage`(`storage_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopEquipment` ADD CONSTRAINT `ShopEquipment_equipmenttype_id_fkey` FOREIGN KEY (`equipmenttype_id`) REFERENCES `EquipmentType`(`equipmenttype_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_storage_id_fkey` FOREIGN KEY (`storage_id`) REFERENCES `Storage`(`storage_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrinksDetails` ADD CONSTRAINT `DrinksDetails_drink_id_fkey` FOREIGN KEY (`drink_id`) REFERENCES `Drink`(`drink_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrinksDetails` ADD CONSTRAINT `DrinksDetails_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `Ingredient`(`ingredient_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuDetails` ADD CONSTRAINT `MenuDetails_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `Menu`(`menu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuDetails` ADD CONSTRAINT `MenuDetails_drink_id_fkey` FOREIGN KEY (`drink_id`) REFERENCES `Drink`(`drink_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_staff_id_fkey` FOREIGN KEY (`staff_id`) REFERENCES `Staff`(`staff_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillDetails` ADD CONSTRAINT `BillDetails_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `Bill`(`bill_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillDetails` ADD CONSTRAINT `BillDetails_drink_id_fkey` FOREIGN KEY (`drink_id`) REFERENCES `Drink`(`drink_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
