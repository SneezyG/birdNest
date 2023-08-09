<?php

session_start();
require_once '../function.php';

authenticate();

echo "<div class='center'>Welcome to Bird's Nest,";

if (!isset($_GET['home']) && $loggedin) {
    redirect($user);
}

echo <<<_END
</div><br>
</div>
 <div data-role="footer">
 <h4>About Bird's Nest </h4>
 <article>
Welcome to our vibrant community! Connect and engage with like-minded individuals from around the world. Connect with friends, and unlock a world of possibilities. Join us today and be part of a supportive community that celebrates your uniqueness and encourages positive interactions. Start sharing your stories and experiences with the world, and let your voice be heard!
 </article>
 </div>
 </body>
</html>
_END;





?>




