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
                        `profile_photo_enabled` boolean NOT NULL,
                        `remarks` varchar(256) DEFAULT NULL,
                        `activated` boolean NOT NULL,
                        `enabled` boolean NOT NULL,
                        `created_by` varchar(50) NOT NULL,
                        `created_time` timestamp NOT NULL,
                        `modified_by` varchar(50) DEFAULT NULL,
                        `modified_time` timestamp NULL DEFAULT NULL,
                        PRIMARY KEY (`id`)
);

INSERT INTO `user` VALUES ('11','user','user@localhost','15000899471','User','User','{bcrypt}$2a$10$4BrM5W7ySTcjRJ.w.tSFs.VK.pciRmoExb8UmEgH8fYD7Yj2Hb6Ue',NULL,NULL,NULL,false,NULL,true,true,'system','2023-10-10 00:00:00','system','2023-10-10 00:00:00'),('12','admin','admin@localhost','15000899472','Admin','Admin','{bcrypt}$2a$10$gUoLi.ICUNWymQRLD46VjeqPEDrk1LtO1z9EoU6SxwgoDY4j/FxDC',NULL,NULL,NULL,false,NULL,true,true,'system','2023-10-10 00:00:00','system','2023-10-10 00:00:00'),('13','louis','louis@luixtech.com','15000899478','Louis','Lau','{bcrypt}$2a$10$5bD//RIhb2W3TrHQ5faSgeVAgoahpmexiLU/vEZ9MXbg5KvKtgzSS',NULL,NULL,NULL,false,NULL,true,true,'system','2023-10-10 00:00:00','system','2023-10-10 00:00:00');

CREATE TABLE `user_permission` (
                       `user_id` varchar(20) NOT NULL,
                       `permission` varchar(36) NOT NULL,
                       PRIMARY KEY (`user_id`,`permission`)
);

INSERT INTO `user_permission` VALUES ('11','user:insert'),('11','user:update'),('11','user:view');

CREATE TABLE `user_role` (
                     `user_id` varchar(20) NOT NULL,
                     `role` varchar(36) NOT NULL,
                     PRIMARY KEY (`user_id`,`role`)
);

INSERT INTO `user_role` VALUES ('11','ROLE_ANONYMOUS'),('11','ROLE_USER'),('12','ROLE_ADMIN'),('12','ROLE_ANONYMOUS'),('12','ROLE_USER'),('13','ROLE_ADMIN'),('13','ROLE_ANONYMOUS'),('13','ROLE_DEVELOPER'),('13','ROLE_USER');
