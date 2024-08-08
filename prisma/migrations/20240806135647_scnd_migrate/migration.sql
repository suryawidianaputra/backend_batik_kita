/*
  Warnings:

  - You are about to drop the column `product_images` on the `product` table. All the data in the column will be lost.
  - Added the required column `image` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `product_images`,
    ADD COLUMN `image` JSON NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `image` VARCHAR(191) NULL;
