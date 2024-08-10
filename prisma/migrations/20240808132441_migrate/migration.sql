/*
  Warnings:

  - Added the required column `product_images` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `product_images` VARCHAR(191) NOT NULL;
