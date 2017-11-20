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
INSERT INTO `chat` VALUES ('Shashwat','App','Shashwat+App.txt'),('Pratyush','App','Pratyush+App.txt'),('Pratyush','Shashwat','Pratyush+Shashwat.txt'),('Lasers67','App','Lasers67+App.txt'),('Lasers67','Pratyush','Lasers67+Pratyush.txt'),('Lasers67','Shashwat','Lasers67+Shashwat.txt'),('Palak Gupta','App','Palak Gupta+App.txt'),('Palak Gupta','Lasers67','Palak Gupta+Lasers67.txt'),('Palak Gupta','Pratyush','Palak Gupta+Pratyush.txt'),('Palak Gupta','Shashwat','Palak Gupta+Shashwat.txt'),('Mehul Raj Kumawat','App','Mehul Raj Kumawat+App.txt'),('Mehul Raj Kumawat','Lasers67','Mehul Raj Kumawat+Lasers67.txt'),('Mehul Raj Kumawat','Palak Gupta','Mehul Raj Kumawat+Palak Gupta.txt'),('Mehul Raj Kumawat','Pratyush','Mehul Raj Kumawat+Pratyush.txt'),('Mehul Raj Kumawat','Shashwat','Mehul Raj Kumawat+Shashwat.txt');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lasers67`
--

DROP TABLE IF EXISTS `lasers67`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lasers67` (
  `FriendName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lasers67`
--

LOCK TABLES `lasers67` WRITE;
/*!40000 ALTER TABLE `lasers67` DISABLE KEYS */;
INSERT INTO `lasers67` VALUES ('Pratyush');
/*!40000 ALTER TABLE `lasers67` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lasers67tags`
--

DROP TABLE IF EXISTS `lasers67tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lasers67tags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lasers67tags`
--

LOCK TABLES `lasers67tags` WRITE;
/*!40000 ALTER TABLE `lasers67tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `lasers67tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mehul raj kumawat`
--

DROP TABLE IF EXISTS `mehul raj kumawat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mehul raj kumawat` (
  `FriendName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mehul raj kumawat`
--

LOCK TABLES `mehul raj kumawat` WRITE;
/*!40000 ALTER TABLE `mehul raj kumawat` DISABLE KEYS */;
INSERT INTO `mehul raj kumawat` VALUES ('Pratyush');
/*!40000 ALTER TABLE `mehul raj kumawat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mehul raj kumawattags`
--

DROP TABLE IF EXISTS `mehul raj kumawattags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mehul raj kumawattags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mehul raj kumawattags`
--

LOCK TABLES `mehul raj kumawattags` WRITE;
/*!40000 ALTER TABLE `mehul raj kumawattags` DISABLE KEYS */;
/*!40000 ALTER TABLE `mehul raj kumawattags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `palak gupta`
--

DROP TABLE IF EXISTS `palak gupta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `palak gupta` (
  `FriendName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palak gupta`
--

LOCK TABLES `palak gupta` WRITE;
/*!40000 ALTER TABLE `palak gupta` DISABLE KEYS */;
INSERT INTO `palak gupta` VALUES ('Pratyush'),('Shashwat');
/*!40000 ALTER TABLE `palak gupta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `palak guptatags`
--

DROP TABLE IF EXISTS `palak guptatags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `palak guptatags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palak guptatags`
--

LOCK TABLES `palak guptatags` WRITE;
/*!40000 ALTER TABLE `palak guptatags` DISABLE KEYS */;
/*!40000 ALTER TABLE `palak guptatags` ENABLE KEYS */;
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
INSERT INTO `pratyush` VALUES ('Lasers67'),('Mehul Raj Kumawat'),('Palak Gupta'),('Shashwat');
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
INSERT INTO `shashwat` VALUES ('Palak Gupta'),('Pratyush');
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
INSERT INTO `shashwattags` VALUES ('C++',0,0.0),('Java',0,0.0),('Language\n     \n   ',0,0.0),('Language\n           \n         ',0,0.0),('Python2.7',1,5.0);
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
INSERT INTO `user` VALUES ('App','2345','aaa','VbbnkZkBvo_B4bJMAAAB',1,'Male'),('Lasers67','Lasers67','abcd@xyz.com','psMG58QWtDemIErEAAAA',0,NULL),('Mehul Raj Kumawat','mehul','mehul@iitmandi.ac.in','fkjxLX_PI3KzWPe3AAAE',0,NULL),('Palak Gupta','palak889','palak@gupta.com','ACmuMQKeSmo1XKO7AAAH',0,NULL),('Pratyush','Pratyush100','pratyushgauravgo@gmail.com','NF3scdzMMg6gNngcAAAD',1,'Male'),('Shashwat','Sg@iitmandi','shshwt.grg@gmail.com','QRbo70JLLpTxgLRbAAAC',0,'Male');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER after_user_insert
AFTER INSERT ON user
FOR EACH ROW
BEGIN
INSERT INTO chat(User1,User2,FileName) select new.Name as User1,user.Name as User2,concat(new.Name,'+',user.Name,'.txt') as FileName from user where new.Name!=user.Name;
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

-- Dump completed on 2017-11-20  9:29:34
