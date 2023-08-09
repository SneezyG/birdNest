<?php

 session_start();
 require_once '../function.php';
 
 authenticate();

 if (isset($_SESSION['user'])) {
   destroySession();
   echo "<br><div class='center'>You have been logged out. Please
   <a data-transition='slide' href='index.php'>click here</a>
   to go to the home screen.</div>";
 }
 else echo "<div class='center'>You cannot log out because you are not logged in</div></div></body></html>";




?>