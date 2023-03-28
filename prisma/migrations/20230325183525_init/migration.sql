-- CreateTable
CREATE TABLE `authors` (
    `compteur` INTEGER NOT NULL AUTO_INCREMENT,
    `Id` VARCHAR(20) NOT NULL,
    `author` VARCHAR(100) NULL,

    UNIQUE INDEX `authors_UN`(`Id`),
    PRIMARY KEY (`compteur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maxims` (
    `compteur` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_author` VARCHAR(20) NOT NULL,
    `maxim` LONGTEXT NULL,

    PRIMARY KEY (`compteur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
