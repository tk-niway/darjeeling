-- AlterTable
ALTER TABLE `User` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT NOW(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT NOW(3) ON UPDATE NOW(3);

-- CreateTable
CREATE TABLE `Video` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `thumbnailUrl` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `duration` INTEGER NULL,
    `visibility` ENUM('public', 'private', 'limited') NOT NULL DEFAULT 'private',
    `uploadStatus` ENUM('pending', 'processing', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    `ownerId` VARCHAR(191) NOT NULL,
    `playCount` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT NOW(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT NOW(3) ON UPDATE NOW(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_guestRelation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_guestRelation_AB_unique`(`A`, `B`),
    INDEX `_guestRelation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_guestRelation` ADD CONSTRAINT `_guestRelation_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_guestRelation` ADD CONSTRAINT `_guestRelation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Video`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
