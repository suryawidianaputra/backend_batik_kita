/*
  Warnings:

  - Added the required column `product_description` to the `favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_images` to the `favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_description` to the `procces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_images` to the `procces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `favorite` ADD COLUMN `product_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_images` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `procces` ADD COLUMN `product_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_images` VARCHAR(191) NOT NULL;
