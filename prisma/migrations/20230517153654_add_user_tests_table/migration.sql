-- CreateTable
CREATE TABLE `users` (
    `compteur` INTEGER NOT NULL AUTO_INCREMENT,
    `Id` VARCHAR(20) NOT NULL,
    `user` VARCHAR(100) NULL,

    UNIQUE INDEX `users_UN`(`Id`),
    PRIMARY KEY (`compteur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
