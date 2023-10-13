-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: luix-passport2
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `oauth2_authorization`
--

DROP TABLE IF EXISTS `oauth2_authorization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_authorization` (
                                        `id` varchar(100) NOT NULL,
                                        `registered_client_id` varchar(100) NOT NULL,
                                        `principal_name` varchar(200) NOT NULL,
                                        `authorization_grant_type` varchar(100) NOT NULL,
                                        `authorized_scopes` varchar(1000) DEFAULT NULL,
                                        `attributes` blob,
                                        `state` varchar(500) DEFAULT NULL,
                                        `authorization_code_value` blob,
                                        `authorization_code_issued_at` timestamp NULL DEFAULT NULL,
                                        `authorization_code_expires_at` timestamp NULL DEFAULT NULL,
                                        `authorization_code_metadata` blob,
                                        `access_token_value` blob,
                                        `access_token_issued_at` timestamp NULL DEFAULT NULL,
                                        `access_token_expires_at` timestamp NULL DEFAULT NULL,
                                        `access_token_metadata` blob,
                                        `access_token_type` varchar(100) DEFAULT NULL,
                                        `access_token_scopes` varchar(1000) DEFAULT NULL,
                                        `oidc_id_token_value` blob,
                                        `oidc_id_token_issued_at` timestamp NULL DEFAULT NULL,
                                        `oidc_id_token_expires_at` timestamp NULL DEFAULT NULL,
                                        `oidc_id_token_metadata` blob,
                                        `refresh_token_value` blob,
                                        `refresh_token_issued_at` timestamp NULL DEFAULT NULL,
                                        `refresh_token_expires_at` timestamp NULL DEFAULT NULL,
                                        `refresh_token_metadata` blob,
                                        `user_code_value` blob,
                                        `user_code_issued_at` timestamp NULL DEFAULT NULL,
                                        `user_code_expires_at` timestamp NULL DEFAULT NULL,
                                        `user_code_metadata` blob,
                                        `device_code_value` blob,
                                        `device_code_issued_at` timestamp NULL DEFAULT NULL,
                                        `device_code_expires_at` timestamp NULL DEFAULT NULL,
                                        `device_code_metadata` blob,
                                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_authorization`
--

LOCK TABLES `oauth2_authorization` WRITE;
/*!40000 ALTER TABLE `oauth2_authorization` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_authorization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_authorization_consent`
--

DROP TABLE IF EXISTS `oauth2_authorization_consent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_authorization_consent` (
                                                `registered_client_id` varchar(100) NOT NULL,
                                                `principal_name` varchar(200) NOT NULL,
                                                `authorities` varchar(1000) NOT NULL,
                                                PRIMARY KEY (`registered_client_id`,`principal_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_authorization_consent`
--

LOCK TABLES `oauth2_authorization_consent` WRITE;
/*!40000 ALTER TABLE `oauth2_authorization_consent` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_authorization_consent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_registered_client`
--

DROP TABLE IF EXISTS `oauth2_registered_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_registered_client` (
                                            `id` varchar(100) NOT NULL,
                                            `client_id` varchar(100) NOT NULL,
                                            `client_id_issued_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                            `client_secret` varchar(200) DEFAULT NULL,
                                            `client_secret_expires_at` timestamp NULL DEFAULT NULL,
                                            `client_name` varchar(200) NOT NULL,
                                            `client_authentication_methods` varchar(1000) NOT NULL,
                                            `authorization_grant_types` varchar(1000) NOT NULL,
                                            `redirect_uris` varchar(1000) DEFAULT NULL,
                                            `post_logout_redirect_uris` varchar(1000) DEFAULT NULL,
                                            `scopes` varchar(1000) NOT NULL,
                                            `client_settings` varchar(2000) NOT NULL,
                                            `token_settings` varchar(2000) NOT NULL,
                                            PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_registered_client`
--

LOCK TABLES `oauth2_registered_client` WRITE;
/*!40000 ALTER TABLE `oauth2_registered_client` DISABLE KEYS */;
INSERT INTO `oauth2_registered_client` VALUES ('S1779648399531835393','messaging-client','2023-10-13 21:49:31','{bcrypt}$2a$10$.ajnVMz7GfhmolQ3qtlVdOtnifNH48NxCV.zN4odUCDdf4vovbuIS',NULL,'S1779648399531835393','client_secret_basic','refresh_token,client_credentials,authorization_code','http://127.0.0.1:4003/authorized,http://127.0.0.1:4003/login/oauth2/code/messaging-client-oidc','http://127.0.0.1:4003/logged-out','openid,profile,message.read,message.write','{\"@class\":\"java.util.Collections$UnmodifiableMap\",\"settings.client.require-proof-key\":false,\"settings.client.require-authorization-consent\":true}','{\"@class\":\"java.util.Collections$UnmodifiableMap\",\"settings.token.reuse-refresh-tokens\":true,\"settings.token.id-token-signature-algorithm\":[\"org.springframework.security.oauth2.jose.jws.SignatureAlgorithm\",\"RS256\"],\"settings.token.access-token-time-to-live\":[\"java.time.Duration\",300.000000000],\"settings.token.access-token-format\":{\"@class\":\"org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat\",\"value\":\"self-contained\"},\"settings.token.refresh-token-time-to-live\":[\"java.time.Duration\",3600.000000000],\"settings.token.authorization-code-time-to-live\":[\"java.time.Duration\",300.000000000],\"settings.token.device-code-time-to-live\":[\"java.time.Duration\",300.000000000]}'),('S1779648399626207234','device-messaging-client','2023-10-13 21:49:31',NULL,NULL,'S1779648399626207234','none','refresh_token,urn:ietf:params:oauth:grant-type:device_code','','','message.read,message.write','{\"@class\":\"java.util.Collections$UnmodifiableMap\",\"settings.client.require-proof-key\":false,\"settings.client.require-authorization-consent\":false}','{\"@class\":\"java.util.Collections$UnmodifiableMap\",\"settings.token.reuse-refresh-tokens\":true,\"settings.token.id-token-signature-algorithm\":[\"org.springframework.security.oauth2.jose.jws.SignatureAlgorithm\",\"RS256\"],\"settings.token.access-token-time-to-live\":[\"java.time.Duration\",300.000000000],\"settings.token.access-token-format\":{\"@class\":\"org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat\",\"value\":\"self-contained\"},\"settings.token.refresh-token-time-to-live\":[\"java.time.Duration\",3600.000000000],\"settings.token.authorization-code-time-to-live\":[\"java.time.Duration\",300.000000000],\"settings.token.device-code-time-to-live\":[\"java.time.Duration\",300.000000000]}');
/*!40000 ALTER TABLE `oauth2_registered_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
                        `id` varchar(20) NOT NULL,
                        `username` varchar(20) NOT NULL,
                        `email` varchar(30) NOT NULL,
                        `mobile_no` varchar(13) NOT NULL,
                        `first_name` varchar(20) DEFAULT NULL,
                        `last_name` varchar(20) DEFAULT NULL,
                        `password_hash` varchar(256) NOT NULL,
                        `activation_key` varchar(256) DEFAULT NULL,
                        `reset_key` varchar(256) DEFAULT NULL,
                        `reset_time` timestamp NULL DEFAULT NULL,
                        `profile_photo_enabled` bit(1) NOT NULL,
                        `remarks` varchar(256) DEFAULT NULL,
                        `activated` bit(1) NOT NULL,
                        `enabled` bit(1) NOT NULL,
                        `created_by` varchar(50) NOT NULL,
                        `created_time` timestamp NOT NULL,
                        `modified_by` varchar(50) DEFAULT NULL,
                        `modified_time` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `ux_user_username` (`username`),
                        UNIQUE KEY `ux_user_email` (`email`),
                        UNIQUE KEY `ux_user_mobile` (`mobile_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('11','user','user@localhost','15000899471','User','User','{bcrypt}$2a$10$4BrM5W7ySTcjRJ.w.tSFs.VK.pciRmoExb8UmEgH8fYD7Yj2Hb6Ue',NULL,NULL,NULL,_binary '\0',NULL,_binary '',_binary '','system','2023-10-10 00:00:00','system','2023-10-10 00:00:00'),('12','admin','admin@localhost','15000899472','Admin','Admin','{bcrypt}$2a$10$gUoLi.ICUNWymQRLD46VjeqPEDrk1LtO1z9EoU6SxwgoDY4j/FxDC',NULL,NULL,NULL,_binary '\0',NULL,_binary '',_binary '','system','2023-10-10 00:00:00','system','2023-10-10 00:00:00'),('13','louis','louis@luixtech.com','15000899478','Louis','Lau','{bcrypt}$2a$10$5bD//RIhb2W3TrHQ5faSgeVAgoahpmexiLU/vEZ9MXbg5KvKtgzSS',NULL,NULL,NULL,_binary '\0',NULL,_binary '',_binary '','system','2023-10-10 00:00:00','system','2023-10-10 00:00:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_permission` (
                                   `user_id` varchar(20) NOT NULL,
                                   `permission` varchar(36) NOT NULL,
                                   PRIMARY KEY (`user_id`,`permission`),
                                   CONSTRAINT `fk_user_permission_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permission`
--

LOCK TABLES `user_permission` WRITE;
/*!40000 ALTER TABLE `user_permission` DISABLE KEYS */;
INSERT INTO `user_permission` VALUES ('11','user:insert'),('11','user:update'),('11','user:view');
/*!40000 ALTER TABLE `user_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
                             `user_id` varchar(20) NOT NULL,
                             `role` varchar(36) NOT NULL,
                             PRIMARY KEY (`user_id`,`role`),
                             CONSTRAINT `fk_user_role_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('11','ROLE_ANONYMOUS'),('11','ROLE_USER'),('12','ROLE_ADMIN'),('12','ROLE_ANONYMOUS'),('12','ROLE_USER'),('13','ROLE_ADMIN'),('13','ROLE_ANONYMOUS'),('13','ROLE_DEVELOPER'),('13','ROLE_USER');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-13 22:00:48
