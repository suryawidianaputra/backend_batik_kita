/*
  Warnings:

  - Added the required column `product_name` to the `procces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `procces` ADD COLUMN `product_name` VARCHAR(191) NOT NULL;
