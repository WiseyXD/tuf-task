-- CreateTable
CREATE TABLE `SubmittedCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `codeLanguage` ENUM('CPlusPlus', 'Java', 'JavaScript', 'Python') NOT NULL,
    `stdin` VARCHAR(191) NULL,
    `sourceCode` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
