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
-- Table structure for table `appTags`
--

DROP TABLE IF EXISTS `appTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appTags` (
  `Language` varchar(255) DEFAULT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  `Rating` decimal(3,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appTags`
--

LOCK TABLES `appTags` WRITE;
/*!40000 ALTER TABLE `appTags` DISABLE KEYS */;
/*!40000 ALTER TABLE `appTags` ENABLE KEYS */;
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
-- Table structure for table `Lasers67`
--

DROP TABLE IF EXISTS `Lasers67`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Lasers67` (
  `FriendName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lasers67`
--

LOCK TABLES `Lasers67` WRITE;
/*!40000 ALTER TABLE `Lasers67` DISABLE KEYS */;
INSERT INTO `Lasers67` VALUES ('Pratyush');
/*!40000 ALTER TABLE `Lasers67` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Lasers67Tags`
--

DROP TABLE IF EXISTS `Lasers67Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Lasers67Tags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lasers67Tags`
--

LOCK TABLES `Lasers67Tags` WRITE;
/*!40000 ALTER TABLE `Lasers67Tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `Lasers67Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mehul Raj Kumawat`
--

DROP TABLE IF EXISTS `Mehul Raj Kumawat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mehul Raj Kumawat` (
  `FriendName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mehul Raj Kumawat`
--

LOCK TABLES `Mehul Raj Kumawat` WRITE;
/*!40000 ALTER TABLE `Mehul Raj Kumawat` DISABLE KEYS */;
INSERT INTO `Mehul Raj Kumawat` VALUES ('Pratyush');
/*!40000 ALTER TABLE `Mehul Raj Kumawat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mehul Raj KumawatTags`
--

DROP TABLE IF EXISTS `Mehul Raj KumawatTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mehul Raj KumawatTags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mehul Raj KumawatTags`
--

LOCK TABLES `Mehul Raj KumawatTags` WRITE;
/*!40000 ALTER TABLE `Mehul Raj KumawatTags` DISABLE KEYS */;
/*!40000 ALTER TABLE `Mehul Raj KumawatTags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Palak Gupta`
--

DROP TABLE IF EXISTS `Palak Gupta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Palak Gupta` (
  `FriendName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Palak Gupta`
--

LOCK TABLES `Palak Gupta` WRITE;
/*!40000 ALTER TABLE `Palak Gupta` DISABLE KEYS */;
INSERT INTO `Palak Gupta` VALUES ('Pratyush'),('Shashwat');
/*!40000 ALTER TABLE `Palak Gupta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Palak GuptaTags`
--

DROP TABLE IF EXISTS `Palak GuptaTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Palak GuptaTags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Palak GuptaTags`
--

LOCK TABLES `Palak GuptaTags` WRITE;
/*!40000 ALTER TABLE `Palak GuptaTags` DISABLE KEYS */;
/*!40000 ALTER TABLE `Palak GuptaTags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pratyush`
--

DROP TABLE IF EXISTS `Pratyush`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pratyush` (
  `FriendName` varchar(255) NOT NULL,
  PRIMARY KEY (`FriendName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pratyush`
--

LOCK TABLES `Pratyush` WRITE;
/*!40000 ALTER TABLE `Pratyush` DISABLE KEYS */;
INSERT INTO `Pratyush` VALUES ('Lasers67'),('Mehul Raj Kumawat'),('Palak Gupta'),('Shashwat');
/*!40000 ALTER TABLE `Pratyush` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PratyushTags`
--

DROP TABLE IF EXISTS `PratyushTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PratyushTags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  `Rating` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PratyushTags`
--

LOCK TABLES `PratyushTags` WRITE;
/*!40000 ALTER TABLE `PratyushTags` DISABLE KEYS */;
INSERT INTO `PratyushTags` VALUES ('C++',2,3.3),('Language\n     \n   ',0,0.0),('Language\n           \n         ',0,0.0),('Python2.7',1,5.0);
/*!40000 ALTER TABLE `PratyushTags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shashwat`
--

DROP TABLE IF EXISTS `Shashwat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Shashwat` (
  `FriendName` varchar(255) NOT NULL,
  PRIMARY KEY (`FriendName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shashwat`
--

LOCK TABLES `Shashwat` WRITE;
/*!40000 ALTER TABLE `Shashwat` DISABLE KEYS */;
INSERT INTO `Shashwat` VALUES ('Palak Gupta'),('Pratyush');
/*!40000 ALTER TABLE `Shashwat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShashwatTags`
--

DROP TABLE IF EXISTS `ShashwatTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ShashwatTags` (
  `Language` varchar(255) NOT NULL,
  `TimesHelped` int(11) DEFAULT NULL,
  `Rating` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`Language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShashwatTags`
--

LOCK TABLES `ShashwatTags` WRITE;
/*!40000 ALTER TABLE `ShashwatTags` DISABLE KEYS */;
INSERT INTO `ShashwatTags` VALUES ('C++',0,0.0),('Java',0,0.0),('Language\n     \n   ',0,0.0),('Language\n           \n         ',0,0.0),('Python2.7',1,5.0);
/*!40000 ALTER TABLE `ShashwatTags` ENABLE KEYS */;
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
  `salt` varchar(255) DEFAULT NULL,
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
INSERT INTO `user` VALUES ('App','2345','deepak','aaa','VbbnkZkBvo_B4bJMAAAB',1,'Male'),('Lasers67','Lasers67','deepak','abcd@xyz.com','psMG58QWtDemIErEAAAA',0,NULL),('Mehul Raj Kumawat','Mehul','deepak','Mehul@iitmandi.ac.in','fkjxLX_PI3KzWPe3AAAE',0,NULL),('Palak Gupta','Palak889','deepak','Palak@Gupta.com','ACmuMQKeSmo1XKO7AAAH',0,NULL),('Pratyush','Pratyush100','deepak','Pratyushgauravgo@gmail.com','NF3scdzMMg6gNngcAAAD',1,'Male'),('Shashwat','Sg@iitmandi','deepak','shshwt.grg@gmail.com','QRbo70JLLpTxgLRbAAAC',0,'Male');
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
