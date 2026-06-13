-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema inv_net
-- -----------------------------------------------------
-- DROP SCHEMA IF EXISTS `inv_net` ;

-- -----------------------------------------------------
-- Schema inv_net
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inv_net` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `inv_net` ;

-- -----------------------------------------------------
-- Table `inv_net`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`category` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`customer` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `number` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `number_UNIQUE` (`number` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`discount`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`discount` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`discount` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `percentage` DECIMAL(5,2) NOT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`employee` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `number` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `role` ENUM('admin', 'manager', 'staff') NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `number_UNIQUE` (`number` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`supplier`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`supplier` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`supplier` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `number` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `number_UNIQUE` (`number` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`product` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `expire` DATE NULL DEFAULT NULL,
  `brand` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `category_id` INT NOT NULL,
  `supplier_id` INT NOT NULL,
  `discount_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_category_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_product_supplier_idx` (`supplier_id` ASC) VISIBLE,
  INDEX `fk_product_discount_idx` (`discount_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `inv_net`.`category` (`id`),
  CONSTRAINT `fk_product_discount`
    FOREIGN KEY (`discount_id`)
    REFERENCES `inv_net`.`discount` (`id`)
    ON DELETE SET NULL,
  CONSTRAINT `fk_product_supplier`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `inv_net`.`supplier` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`image` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(255) NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_image_product_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_image_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `inv_net`.`product` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`warehouse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`warehouse` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`warehouse` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `capacity` TINYINT NOT NULL,
  `employee_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_warehouse_employee_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_warehouse_employee`
    FOREIGN KEY (`employee_id`)
    REFERENCES `inv_net`.`employee` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`inventory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`inventory` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`inventory` (
  `last_update` DATE NOT NULL,
  `quantity` INT NOT NULL,
  `product_id` INT NOT NULL,
  `warehouse_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `warehouse_id`),
  INDEX `fk_inventory_product_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_inventory_warehouse_idx` (`warehouse_id` ASC) VISIBLE,
  CONSTRAINT `fk_inventory_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `inv_net`.`product` (`id`),
  CONSTRAINT `fk_inventory_warehouse`
    FOREIGN KEY (`warehouse_id`)
    REFERENCES `inv_net`.`warehouse` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`orders` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `payment_status` TINYINT NOT NULL,
  `status` TINYINT NOT NULL,
  `preorder` TINYINT NOT NULL,
  `total` DECIMAL(10,2) NULL DEFAULT NULL,
  `customer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_customer_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `inv_net`.`customer` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`order_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`order_detail` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`order_detail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `sub_total` DECIMAL(10,2) NOT NULL,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_detail_order_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_order_detail_product_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_detail_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `inv_net`.`orders` (`id`),
  CONSTRAINT `fk_order_detail_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `inv_net`.`product` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`payment_customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`payment_customer` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`payment_customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `status` ENUM('complete', 'pending', 'cancel') NOT NULL,
  `method` ENUM('cash', 'credit card', 'transfer') NOT NULL,
  `employee_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_payment_customer_employee_idx` (`employee_id` ASC) VISIBLE,
  INDEX `fk_payment_customer_order_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_payment_customer_employee`
    FOREIGN KEY (`employee_id`)
    REFERENCES `inv_net`.`employee` (`id`),
  CONSTRAINT `fk_payment_customer_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `inv_net`.`orders` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`purchase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`purchase` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`purchase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL DEFAULT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `supplier_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_purchase_supplier_idx` (`supplier_id` ASC) VISIBLE,
  INDEX `fk_purchase_employee_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_purchase_employee`
    FOREIGN KEY (`employee_id`)
    REFERENCES `inv_net`.`employee` (`id`),
  CONSTRAINT `fk_purchase_supplier`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `inv_net`.`supplier` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`payment_supplier`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`payment_supplier` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`payment_supplier` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `status` ENUM('approve', 'pending', 'decline') NOT NULL,
  `method` ENUM('cash', 'credit card', 'transfer') NOT NULL,
  `purchase_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_payment_supplier_purchase_idx` (`purchase_id` ASC) VISIBLE,
  INDEX `fk_payment_supplier_employee_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_payment_supplier_employee`
    FOREIGN KEY (`employee_id`)
    REFERENCES `inv_net`.`employee` (`id`),
  CONSTRAINT `fk_payment_supplier_purchase`
    FOREIGN KEY (`purchase_id`)
    REFERENCES `inv_net`.`purchase` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `inv_net`.`purchase_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inv_net`.`purchase_detail` ;

CREATE TABLE IF NOT EXISTS `inv_net`.`purchase_detail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `price` DECIMAL(10,2) NOT NULL,
  `sub_total` DECIMAL(10,2) NULL DEFAULT NULL,
  `quantity` INT NOT NULL,
  `purchase_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_purchase_detail_purchase_idx` (`purchase_id` ASC) VISIBLE,
  INDEX `fk_purchase_detail_product_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_purchase_detail_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `inv_net`.`product` (`id`),
  CONSTRAINT `fk_purchase_detail_purchase`
    FOREIGN KEY (`purchase_id`)
    REFERENCES `inv_net`.`purchase` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
