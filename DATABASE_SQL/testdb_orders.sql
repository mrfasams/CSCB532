-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: testdb
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `order_status` int DEFAULT NULL,
  `placed_order_date` datetime DEFAULT NULL,
  `price` decimal(19,2) DEFAULT NULL,
  `received_in_office` bit(1) DEFAULT NULL,
  `received_order_date` datetime DEFAULT NULL,
  `recipient` varchar(255) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `weight` decimal(19,2) DEFAULT NULL,
  `company_office_id` bigint DEFAULT NULL,
  `employee_id` bigint DEFAULT NULL,
  `sender_user_id` bigint DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `company_office_to_id` bigint DEFAULT NULL,
  `receiver_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmq2k88j6t0253fj925ylofsp1` (`company_office_id`),
  KEY `FKgd67qo7p9pvyabrt03jamvni5` (`employee_id`),
  KEY `FKtrkhu29am6m4yvfygf4qvqgac` (`sender_user_id`),
  KEY `FKqojug1mqnbiuy3c209hsolfru` (`company_office_to_id`),
  KEY `FKh45y4ibdxk3oy1kflns29rrmi` (`receiver_user_id`),
  CONSTRAINT `FKgd67qo7p9pvyabrt03jamvni5` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKh45y4ibdxk3oy1kflns29rrmi` FOREIGN KEY (`receiver_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKmq2k88j6t0253fj925ylofsp1` FOREIGN KEY (`company_office_id`) REFERENCES `company_office` (`id`),
  CONSTRAINT `FKqojug1mqnbiuy3c209hsolfru` FOREIGN KEY (`company_office_to_id`) REFERENCES `company_office` (`id`),
  CONSTRAINT `FKtrkhu29am6m4yvfygf4qvqgac` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'fsdfsdfsdf',0,'2023-07-05 18:35:51',13.00,_binary '',NULL,'21212','555555',2.00,1,1,1,NULL,3,10),(2,'niki e tuk',0,'2023-07-06 23:57:29',10.50,_binary '',NULL,'fdffdfdfdf','dfdfdf',1.00,1,2,1,NULL,3,10),(3,'order 2',0,'2023-07-08 16:28:50',12.50,_binary '\0',NULL,'niki','niki',10.00,1,2,1,NULL,3,12),(4,'order 1',0,'2023-07-08 14:58:05',13.00,_binary '',NULL,'Nikoleta todorova','Iskra todorova',2.00,1,2,1,NULL,3,12),(5,'order 2',0,'2023-07-08 16:10:57',33.00,_binary '',NULL,'niki','niki',10.00,1,2,2,NULL,3,12),(6,'order 21',2,'2023-07-08 15:57:13',10.50,_binary '','2023-07-08 15:57:13','niki','niki',1.00,1,1,1,NULL,3,12),(7,'order 123',2,'2023-07-08 16:12:59',5.50,_binary '\0','2023-07-08 16:12:59','ivan ivanov','petar petrov',3.00,1,3,2,NULL,3,12),(8,'order client1',2,'2023-07-09 13:00:48',4.50,_binary '\0','2023-07-09 13:00:48','eeeeee','eeeeeeeeeeeeeeee',2.00,2,9,11,'sssssssssssssssssssssssssssssss',NULL,12),(9,'dfdfdf',1,'2023-07-08 21:43:41',10.55,_binary '',NULL,'dfdf','dfdf',1.50,2,5,11,NULL,4,12),(10,'sss',0,'2023-07-09 12:51:07',4.50,_binary '\0',NULL,'ssss','niki',2.00,4,9,1,'changed address',NULL,1),(11,'order cour 1',0,'2023-07-08 22:09:28',13.00,_binary '',NULL,'order cour 1','order cour 1',2.00,4,9,10,NULL,2,12),(12,'client 14 order',2,'2023-07-08 22:39:24',5.50,_binary '\0','2023-07-08 22:39:24',NULL,NULL,3.00,2,9,12,'ssssdsdsdsd',3,10),(19,'clientTo',0,'2023-07-09 12:01:42',3.50,_binary '\0',NULL,NULL,NULL,1.00,4,26,20,'ul Nikolaj Haitov 34',NULL,10),(20,'order serRolesRegister123',0,'2023-07-09 17:24:03',4.50,_binary '\0',NULL,NULL,NULL,2.00,2,9,20,'sdsdsdsdsdsd',NULL,20),(21,'order to client 20 lololo',0,'2023-07-09 17:54:19',6.50,_binary '\0',NULL,NULL,NULL,4.00,2,9,1,'ul Nikolaj Haitov 34',NULL,20);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-10 19:34:18
