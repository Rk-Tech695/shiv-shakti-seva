-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `mobile_number` VARCHAR(191) NOT NULL,
    `whatsapp_number` VARCHAR(191) NULL,
    `dob` DATETIME(3) NULL,
    `total_donated_amount` DOUBLE NOT NULL DEFAULT 0,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_mobile_number_key`(`mobile_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `paymentMode` ENUM('RAZORPAY', 'UPI', 'BANK_TRANSFER', 'CASH') NOT NULL,
    `transactionId` VARCHAR(191) NULL,
    `receivedBy` VARCHAR(191) NULL,
    `verifiedBy` VARCHAR(191) NULL,
    `verifiedAt` DATETIME(3) NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `invoiceUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `purpose` VARCHAR(191) NOT NULL,
    `sourceType` ENUM('CASH', 'BANK') NOT NULL,
    `handledBy` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `eventDate` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NULL,
    `bannerImage` VARCHAR(191) NULL,
    `totalSlots` INTEGER NOT NULL DEFAULT 100,
    `bookedSlots` INTEGER NOT NULL DEFAULT 0,
    `slotEnabled` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trustee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pnr` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `totalPersons` INTEGER NOT NULL,
    `totalAmount` DOUBLE NULL DEFAULT 0,
    `bookingStatus` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'CONFIRMED',
    `ticketUrl` VARCHAR(191) NULL,
    `checkedIn` BOOLEAN NOT NULL DEFAULT false,
    `eventId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `BookingGroup_pnr_key`(`pnr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devotee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `gender` VARCHAR(191) NULL,
    `mobileNumber` VARCHAR(191) NULL,
    `bookingGroupId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppSetting` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `maxDevoteesPerBooking` INTEGER NOT NULL DEFAULT 5,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingGroup` ADD CONSTRAINT `BookingGroup_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Devotee` ADD CONSTRAINT `Devotee_bookingGroupId_fkey` FOREIGN KEY (`bookingGroupId`) REFERENCES `BookingGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
