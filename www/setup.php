<?php


require_once 'functions.php';

createTable('members',
 'user VARCHAR(16),
 pass VARCHAR(36),
 channel CHAR(36),
 status CHAR(1),
 notice VARCHAR(180),
 INDEX(user(6))');



createTable('messages',
 'id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 sender VARCHAR(16),
 receiver VARCHAR(16),
 message VARCHAR(4096),
 status CHAR(1),
 created DATETIME DEFAULT CURRENT_TIMESTAMP,
 INDEX(sender(6)),
 INDEX(receiver(6))');



createTable('friends',
 'user VARCHAR(16),
 friend VARCHAR(16),
 INDEX(user(6)),
 INDEX(friend(6))');


createTable('profiles',
 'user VARCHAR(16),
 country VARCHAR(128),
 text VARCHAR(4096),
 created DATETIME DEFAULT CURRENT_TIMESTAMP,
 INDEX(user(6))');





?>
