-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `auth0Id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT NOW(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT NOW(3) ON UPDATE NOW(3),

    UNIQUE INDEX `User_auth0Id_key`(`auth0Id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
