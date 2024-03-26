CREATE TABLE `users` (
    `userId` INT NOT NULL AUTO_INCREMENT,
    `userCreated` DATETIME NOT NULL,
    `userName` VARCHAR(20) NOT NULL,
    `userEmail` VARCHAR(50) NOT NULL,
    `userPassword` VARCHAR(20) NOT NULL,
    `userType` CHAR(10) NOT NULL,
    PRIMARY KEY (`userId`),
    UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE
);

CREATE TABLE `cart` (
    `cartId` INT NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(9) NOT NULL,
    `dateCreated` DATETIME NOT NULL,
    `userId` INT NOT NULL,
    PRIMARY KEY (`cartId`),
    UNIQUE INDEX `cartId_UNIQUE` (`cartId` ASC) VISIBLE,
    UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
    CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `categories` (
    `categoryId` INT NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(10) NOT NULL,
    `order` INT NOT NULL,
    PRIMARY KEY (`categoryId`),
    UNIQUE INDEX `categoryId_UNIQUE` (`categoryId` ASC) VISIBLE,
    UNIQUE INDEX `categoryName_UNIQUE` (`categoryName` ASC) VISIBLE
);

CREATE TABLE `products` (
    `productId` INT NOT NULL AUTO_INCREMENT,
    `productName` VARCHAR(50) NOT NULL,
    `productDesc` VARCHAR(100) NOT NULL,
    `imageUrl` VARCHAR(100) NOT NULL,
    `price` DECIMAL(5, 2) NOT NULL,
    `productSet` VARCHAR(5) NOT NULL,
    `productYear` INT NOT NULL,
    `categoryId` INT NOT NULL,
    PRIMARY KEY (`productId`),
    UNIQUE INDEX `productId_UNIQUE` (`productId` ASC) VISIBLE,
    UNIQUE INDEX `categoryId_UNIQUE` (`categoryId` ASC) VISIBLE,
    CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `cartproducts` (
    `cartProductsId` INT NOT NULL AUTO_INCREMENT,
    `productId` INT NOT NULL,
    `cartId` INT NOT NULL,
    `quantity` INT NOT NULL,
    PRIMARY KEY (`cartProductsId`),
    UNIQUE INDEX `cartProductsId_UNIQUE` (`cartProductsId` ASC) VISIBLE,
    UNIQUE INDEX `productId_UNIQUE` (`productId` ASC) VISIBLE,
    UNIQUE INDEX `cartId_UNIQUE` (`cartId` ASC) VISIBLE,
    CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `cartId` FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`) ON DELETE NO ACTION ON UPDATE NO ACTION
);