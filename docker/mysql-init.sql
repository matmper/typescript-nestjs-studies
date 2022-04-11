CREATE DATABASE `typescript-nest-js` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `typescript-nest-js`;

CREATE USER 'user'@'%' IDENTIFIED BY 'pass123';

GRANT ALL PRIVILEGES ON `typescript-nest-js`.* TO 'user'@'%';

FLUSH PRIVILEGES;