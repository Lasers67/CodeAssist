-- MySQL dump 10.13  Distrib 5.7.18, for Win64 (x86_64)
--
-- Host: localhost    Database: Test
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app`
--

DROP TABLE IF EXISTS `app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app` (
  `FriendName` varchar(255) NOT NULL,
  PRIMARY KEY (`FriendName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app`
--

LOCK TABLES `app` WRITE;
/*!40000 ALTER TABLE `app` DISABLE KEYS */;
/*!40000 ALTER TABLE `app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apptags`
--

DROP TABLE IF EXISTS `apptags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apptags` (
  `Language` varchar(255) DEFAULT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  `Rating` decimal(3,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apptags`
--

LOCK TABLES `apptags` WRITE;
/*!40000 ALTER TABLE `apptags` DISABLE KEYS */;
/*!40000 ALTER TABLE `apptags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `User1` varchar(255) DEFAULT NULL,
  `User2` varchar(255) DEFAULT NULL,
  `FileName` varchar(255) DEFAULT NULL,
  KEY `User1` (`User1`),
  KEY `User2` (`User2`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`User1`) REFERENCES `user` (`Name`),
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`User2`) REFERENCES `user` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES ('Shashwat','App','Shashwat+App.txt'),('Pratyush','App','Pratyush+App.txt'),('Pratyush','Shashwat','Pratyush+Shashwat.txt');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code`
--

DROP TABLE IF EXISTS `code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `code` (
  `User` varchar(255) NOT NULL,
  `File` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code`
--

LOCK TABLES `code` WRITE;
/*!40000 ALTER TABLE `code` DISABLE KEYS */;
/*!40000 ALTER TABLE `code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pratyush`
--

DROP TABLE IF EXISTS `pratyush`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pratyush` (
  `FriendName` varchar(255) NOT NULL,
  PRIMARY KEY (`FriendName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pratyush`
--

LOCK TABLES `pratyush` WRITE;
/*!40000 ALTER TABLE `pratyush` DISABLE KEYS */;
INSERT INTO `pratyush` VALUES ('Shashwat');
/*!40000 ALTER TABLE `pratyush` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pratyushtags`
--

DROP TABLE IF EXISTS `pratyushtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pratyushtags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  `Rating` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pratyushtags`
--

LOCK TABLES `pratyushtags` WRITE;
/*!40000 ALTER TABLE `pratyushtags` DISABLE KEYS */;
INSERT INTO `pratyushtags` VALUES ('C++',2,3.3),('Language\n     \n   ',0,0.0),('Language\n           \n         ',0,0.0),('Python2.7',1,5.0);
/*!40000 ALTER TABLE `pratyushtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `Name` varchar(255) DEFAULT NULL,
  `Contact` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shashwat`
--

DROP TABLE IF EXISTS `shashwat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shashwat` (
  `FriendName` varchar(255) NOT NULL,
  PRIMARY KEY (`FriendName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shashwat`
--

LOCK TABLES `shashwat` WRITE;
/*!40000 ALTER TABLE `shashwat` DISABLE KEYS */;
INSERT INTO `shashwat` VALUES ('Pratyush');
/*!40000 ALTER TABLE `shashwat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shashwattags`
--

DROP TABLE IF EXISTS `shashwattags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shashwattags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  `Rating` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shashwattags`
--

LOCK TABLES `shashwattags` WRITE;
/*!40000 ALTER TABLE `shashwattags` DISABLE KEYS */;
INSERT INTO `shashwattags` VALUES ('C++',0,0.0),('Java',0,0.0),('Language\n     \n   ',0,0.0),('Language\n           \n         ',0,0.0);
/*!40000 ALTER TABLE `shashwattags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `Name` varchar(255) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `SessionID` varchar(255) DEFAULT NULL,
  `Online` int(11) DEFAULT NULL,
  `Gender` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('App','2345','aaa','VbbnkZkBvo_B4bJMAAAB',1,'Male'),('Pratyush','Pratyush100','pratyushgauravgo@gmail.com','L1IjUcdfqPkxUxenAAAA',0,'Male'),('Shashwat','Sg@iitmandi','shshwt.grg@gmail.com','Cemszs5OEJ-nJSKSAAAC',1,'Male');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_user_insert
BEFORE INSERT ON User
FOR EACH ROW
BEGIN
INSERT INTO Chat(User1,User2,FileName) select new.Name as User1,User.Name as User2,concat(new.Name,'+',User.Name,'.txt') as FileName from User;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-19  1:35:00
