/*
  Warnings:

  - You are about to drop the column `product_images` on the `procces` table. All the data in the column will be lost.
  - Added the required column `product_image` to the `procces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `procces` DROP COLUMN `product_images`,
    ADD COLUMN `product_image` VARCHAR(191) NOT NULL;
