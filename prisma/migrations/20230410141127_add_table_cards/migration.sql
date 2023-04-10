-- CreateTable
CREATE TABLE `cards` (
    `compteur` INTEGER NOT NULL AUTO_INCREMENT,
    `card_text` LONGTEXT NULL,

    PRIMARY KEY (`compteur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
