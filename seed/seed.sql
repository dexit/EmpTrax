/* 
database name is eomployee tracker.

department

id: INT PRIMARY KEY

name: VARCHAR(30) to hold department name

role

id: INT PRIMARY KEY

title: VARCHAR(30) to hold role title

salary: DECIMAL to hold role salary

department_id: INT to hold reference to department role belongs to

employee

id: INT PRIMARY KEY

first_name: VARCHAR(30) to hold employee first name

last_name: VARCHAR(30) to hold employee last name

role_id: INT to hold reference to employee role

manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)


DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE IF NOT EXISTS departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance');

INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 100000, 1),
  ('Sales Representative', 50000, 1),
  ('Software Engineer', 80000, 2),
  ('Senior Software Engineer', 100000, 2),
  ('Accountant', 60000, 3),
  ('Financial Analyst', 80000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Doe', 2, 1),
  ('Bob', 'Smith', 3, NULL),
  ('Alice', 'Johnson', 4, 3),
  ('Tom', 'Jones', 5, NULL),
  ('Samantha', 'Brown', 6, 5);

*/


DROP DATABASE IF EXISTS `employee_tracker`;
CREATE DATABASE `employee_tracker`;
USE `employee_tracker`;


-- -----------------------------------------------------
-- Table `employee_tracker`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employee_tracker`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employee_tracker`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employee_tracker`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL(10,0) NOT NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `department_id` (`department_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `role_ibfk_1`
    FOREIGN KEY (`department_id`)
    REFERENCES `employee_tracker`.`department` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employee_tracker`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employee_tracker`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `role_id` INT NOT NULL,
  `manager_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `role_id` (`role_id` ASC) VISIBLE,
  INDEX `manager_id` (`manager_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `employee_ibfk_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `employee_tracker`.`role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `employee_ibfk_2`
    FOREIGN KEY (`manager_id`)
    REFERENCES `employee_tracker`.`employee` (`id`)  ON DELETE SET NULL,
    )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- Data for table `employee_tracker`.`department`
-- -----------------------------------------------------

USE `employee_tracker`;
INSERT INTO `employee_tracker`.`department` (`id`, `name`) VALUES (1, 'IT');
INSERT INTO `employee_tracker`.`department` (`id`, `name`) VALUES (2, 'Finance');
INSERT INTO `employee_tracker`.`department` (`id`, `name`) VALUES (3, 'Social Media');
INSERT INTO `employee_tracker`.`department` (`id`, `name`) VALUES (4, 'HR');
INSERT INTO `employee_tracker`.`department` (`id`, `name`) VALUES (5, 'Facilities');

-- -----------------------------------------------------
-- Data for table `employee_tracker`.`role`
-- -----------------------------------------------------

INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (1, 'Senior Web Developer', 45000, 1);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (2, 'Junior DevOp', 40000, 1);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (3, 'HR Manager', 23000, 4);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (4, 'HR Assistant', 18750, 4);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (5, 'Accountant', 30000, 2);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (6, 'CFO', 75000, 2);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (7, 'Brand Designer', 27500, 3);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (8, 'Marketing Apprentice', 9250, 3);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (9, 'Facilities Admin', 17850, 5);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (10, 'Facilities Supervisor', 23500, 5);
INSERT INTO `employee_tracker`.`role` (`id`, `title`, `salary`, `department_id`) VALUES (11, 'Director', 75000, 1);

-- -----------------------------------------------------
-- Data for table `employee_tracker`.`employee`
-- -----------------------------------------------------

INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (1, 'Lorraine', 'Hogs', 3, 5);
INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (2, 'Rihards', 'Man', 1, 5);
INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (3, 'Tom', 'Giles', 2, 1);
INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (4, 'Natalie', 'Smith', 5, 5);
INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (5, 'Malcolm', 'Manfree', 11, NULL);
INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (6, 'Hanna', 'Barbara', 4, 1);
INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (7, 'Irina', 'Carol', 7, 3);
INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (8, 'Jasmine', 'Tche', 9, 9);
INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (9, 'Tom', 'Mahoney', 10, NULL);
INSERT INTO `employee_tracker`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES (10, 'Alex', 'Simkson', 6, 4);
