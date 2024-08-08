/*
  Warnings:

  - You are about to drop the column `image` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - Added the required column `product_images` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `image`,
    ADD COLUMN `product_images` JSON NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `image`,
    ADD COLUMN `profilePitcure` VARCHAR(191) NULL;
