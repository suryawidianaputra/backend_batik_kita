/*
  Warnings:

  - You are about to drop the column `product_images` on the `favorite` table. All the data in the column will be lost.
  - You are about to alter the column `product_price` on the `favorite` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `product_image` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `favorite` DROP COLUMN `product_images`,
    ADD COLUMN `product_image` VARCHAR(191) NOT NULL,
    MODIFY `product_price` INTEGER NOT NULL;
