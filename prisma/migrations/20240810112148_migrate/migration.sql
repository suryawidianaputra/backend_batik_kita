/*
  Warnings:

  - You are about to drop the column `product_description` on the `favorite` table. All the data in the column will be lost.
  - Added the required column `product_price` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `favorite` DROP COLUMN `product_description`,
    ADD COLUMN `product_price` VARCHAR(191) NOT NULL;
