/*
  Warnings:

  - You are about to drop the column `account_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `product_images` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `account_id`,
    DROP COLUMN `email`,
    DROP COLUMN `product_id`,
    DROP COLUMN `product_images`;

-- CreateTable
CREATE TABLE `product_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `product_images` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
