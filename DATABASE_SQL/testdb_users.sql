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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `first_name` varchar(120) DEFAULT NULL,
  `last_name` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'niki@gmail.com','$2a$10$EHloWfuruEimN89WXOqBAu.xv1sXUmNh9D0JYc9SghNCLdGwRY4Na','client1','Niki','Niki'),(2,'niki123@gmail.com','client2','client2','Niki','Niki'),(3,'niki23@gmail.com','$2a$10$EHloWfuruEimN89WXOqBAu.xv1sXUmNh9D0JYc9SghNCLdGwRY4Na','client3','Niki','Niki'),(4,'toto@gmaittl.com','$2a$10$EHloWfuruEimN89WXOqBAu.xv1sXUmNh9D0JYc9SghNCLdGwRY4Na','client4','Niki','Niki'),(5,'123456@gmfsdfsdf.comb','123456','Employee1','Niki','Niki'),(6,'niki234@gfsdf.com','$2a$10$IhWjK.rpUMBu/04G0MrKj..WJzDREQoSCT4pIYerfu/sQWulTyMhS','Employee2','Niki','Niki'),(7,'niki987@gfdf.com','$2a$10$1jKLWd1ymWKSZUZCwZowEeeapFSHDrlzNqaYYU7HErzzOK.malQBy','Employee3','Niki','Niki'),(8,'titit@titit.titit','$2a$10$oe1zNxoAsD5v2ZN5l6B9SuNx8QfotmtIcsvG2Zk5DS8aLX/LbFpde','Employee4','Niki','Niki'),(9,'courier1@courier1.courier1','$2a$10$whLpt0e3L2ix06VyagBmsO6EyQ9JkaUKlUIarrAYQ3V7zj8ZmOPfO','courier1','courier1','courier1'),(10,'client8@fdfd.com','$2a$10$HHqC8Q3OVyibhJW5PmFPFuUFoX/uPAV6kWaEXzZM3RZ8WPciXlGdq','client8','client8','client8'),(11,'client10@client10.client10','$2a$10$A0XhYQ2V5P2uzB2/uG425edhfCT8gBdSfU1mxrWqW1977T0olK.Dy','client10','client10','client10'),(12,'client14@client14.client14','$2a$10$Y3l.IGHoTixLYY5NMOKovewYMq3GGwEgz9ZLyCBzCY8Ycf3ymCMly','client14','client14','client14'),(20,'lololololo@lololololo.lololololo','$2a$10$78oVBUUlZ7qNdb/bWcQ/XuBr.P32tM1vFleomn7cx07p6tz1F0546','lololololo','lololololo','lololololo'),(21,'employee45@employee45.employee45','$2a$10$k6EaFWH8UJ81kFGJdleYlOFqBZPfUGHIfI8CwwgxRAJk23B..7MIq','employee45','employee45','employee45'),(22,'employee4567@employee4567.employee4567','$2a$10$GwyB9lZ8CLKIXaZEfj8/R.taomxhHqm8qszAZ4gA.6lFTeiFpz7Ra','employee4567','employee4567','employee4567'),(23,'serRolesRegister@serRolesRegister.com','$2a$10$tQj6jTdUIAomui/AzOOWoegZqZ6SeNfxGpAASzrXYxyb6JpPln02i','serRolesRegister','serRolesRegister','serRolesRegister'),(24,'serRolesRegister@serRolesRegiste1r.com','$2a$10$WRW.PPx8wHnCiAKK5Go1GOTPMZRF1nk8FEOuFlG..Pju7g737YzWS','serRolesRegister1','serRolesRegister','serRolesRegister'),(25,'serRolesRegister@serRolesRegiste12r.com','$2a$10$iIRGUN0Aj9V/DFSRVo5zWuZzWb/fO2xV1IIVACfXC5mHBN472PO5S','serRolesRegister12','serRolesRegister','serRolesRegister'),(26,'serRolesRegister@serRolesRegiste1e2r.com','$2a$10$fP64jyfhUaXxePcSueF9RewV1LPwvm8Lb/omJ70otj3C1EuNCo2ny','serRolesRegister123','serRolesRegister','serRolesRegister'),(27,'kdkdkdkdkd@kdkdkdkdkd.com','$2a$10$foPieK3g/cVS.A13YJSzIOF4/tA332rPWljIDOMwdDZjON6bicbnK','kdkdkdkdkd','kdkdkdkdkd','kdkdkdkdkd'),(28,'kdkdkdkdkd@kdkdkdk1dkd.com','$2a$10$UX7g8f6wQabTWfK.3VyH/.arj84Xi4cmuKTR6nifY7JP.1ZXjyjni','kdkdkdkdkd1','kdkdkdkdkd','kdkdkdkdkd'),(29,'kdkdkdkdkd12@kdkdkdk1dkd.com','$2a$10$5Wgn1k1QQKCJNCx2ut6ZdenuAsyeHC1jfF6K8u3NBJEe/teEIZUCC','kdkdkdkdkd12','kdkdkdkdkd','kdkdkdkdkd'),(30,'kdkdkdkdkd1256@kdkdkdk1dkd.com','$2a$10$3g/ijvEZcSZRaYr48jd4wOphAXNMkUwv45XKDYSDQSz6PXYXrX9OG','kdkdkdkdkd1256','kdkdkdkdkd1256','kdkdkdkdkd'),(31,'kdkdkdkdkd125667@fdf.com','$2a$10$diSRU3k7ke5IH.it3Qj8yupFhFvQ26kdasOz7.qVc0UNGXBtJGshK','kdkdkdkdkd125667','kdkdkdkdkd1256','kdkdkdkdkd1256'),(32,'trttrttrttrttrt@dsd.ds','$2a$10$Yald9TGz7.IvEs4LltsCvO.VfoSTglqGMPwFXcXCFONLpwLO8GsPi','trttrttrttrttrt','trttrttrttrttrt','trttrttrttrttrt'),(33,'trttrttrttrttrt1@dsd.ds','$2a$10$qfWi9.S33gxOxIxxILyzj.0w/WthFoWAWZxnCDNjWR5OAwqG2e.ra','trttrttrttrttrt1','trttrttrttrttrt1','trttrttrttrttrt1'),(34,'trttrttrttrttrt14@dsd.ds','$2a$10$9uFLnUPX53mKUwHNqkXvZ.x1uoESucSH6Ts2Lquelr.dUkYPNwHHC','trttrttrttrttrt14','trttrttrttrttrt1','trttrttrttrttrt1'),(35,'rrrrrrrrrrrrrr@cdf.fdf','$2a$10$PHCazD259CKL331uNqJTAOeh8/r2aoDRQ0BQNmF1Aov5EQspBjEfW','rrrrrrrrrrrrrr','rrrrrrrrrrrrrr','rrrrrrrrrrrrrr');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
