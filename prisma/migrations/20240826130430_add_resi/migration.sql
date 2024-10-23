/*
  Warnings:

  - Added the required column `resi` to the `procces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `procces` ADD COLUMN `resi` VARCHAR(191) NOT NULL;
