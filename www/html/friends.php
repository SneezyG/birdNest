<?php

session_start();
require_once '../function.php';

authenticate();

authorize($loggedin);

['mutual'=>$mutual, 'followers'=>$followers, 'following'=>$following] = set($user);

echo "<br>";


echo "<span class='subhead'>Your mutual friends</span><ul>";
if (sizeof($mutual)) {
  foreach($mutual as $friend) {
    $result = queryMysql("SELECT * FROM members WHERE user='$friend'");
    $row = $result->fetch_array(MYSQLI_ASSOC);
    if ($row['status']) $status = "online";
    else $status = "offline";
    
    echo "<li>";
    showPics($friend, "friend");
    echo <<<_mut
    <a href='account.php?member=$friend'>$friend</a>
    <span>$status <a href='chat.php?member=$friend' data-role='button'>message</a></span>
    </li>
_mut;
  }
} else echo "<li>You don't have any mutual friends</li>";
echo "</ul>";


echo "<span class='subhead'>Your followers</span><ul>";
if (sizeof($followers)) {
  foreach($followers as $friend) {
    echo "<li>";
    showPics($friend, "friend");
    echo <<<_fol
    <a href='account.php?member=$friend'>$friend</a>
    </li>
_fol;
  }
} else echo "<li>You don't have any followers</li>"
echo "</ul>";


echo "<span class='subhead'>You are following</span><ul>";
if (sizeof($following)) {
  foreach($following as $friend) {
    echo "<li>";
    showPics($friend, "friend");
    echo <<<_fol
    <a href='account.php?member=$friend'>$friend</a>
    </li>
_fol;
  }
} else echo "<li>You don't follow anybody</li>"
echo "</ul>";

?>

</div>
</body>
</html>
