/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `name` TEXT NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT NOW(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT NOW(3) ON UPDATE NOW(3);
