<?php

session_start();
require_once '../function.php';

authenticate();

authorize($loggedin);

If (!isset($_GET['member'])) {
  notFound();
}

$member = $_GET['member'];

$result = queryMysql("SELECT * FROM profiles WHERE user='$member'");
$row = $result->fetch_array(MYSQLI_ASSOC);
$country = stripslashes($row['country']);
$text = stripslashes($row['text']);
$date = stripslashes($row['created']);

showProfile($member, $text, $country, $date);

echo "<br>";

$followed = queryMysql("SELECT * FROM friends WHERE user='$user' AND friend='$member'");
$followed = $followed->num_rows;

$following = queryMysql("SELECT * FROM friends WHERE user='$member' AND friend='$user'");
$following = $following->num_rows;

if ($followed && $following) echo "<p>You are mutual friends<button>Follow</button></p>";
elseif ($following) echo "<p>You are following $member<button>Unfollow</button></p>";
elseif ($followed) echo "<p>$member is following you <button>Follow back</button></p>";
else echo "<p><button>Follow $member</button></p>";

echo "<br>";

$followers = array();
$following = array();
 
$result = queryMysql("SELECT * FROM friends WHERE user='$member'");
$num = $result->num_rows;

for ($j = 0 ; $j < $num ; ++$j) {
  $row = $result->fetch_array(MYSQLI_ASSOC);
  $followers[$j] = $row['friend'];
}

$result = queryMysql("SELECT * FROM friends WHERE friend='$member'");
$num = $result->num_rows;
 
for ($j = 0 ; $j < $num ; ++$j) {
  $row = $result->fetch_array(MYSQLI_ASSOC);
  $following[$j] = $row['user'];
}

$mutual = array_intersect($followers, $following);

echo "<h5>$member mutuals friends</h5><ul>";
if (sizeof($mutual)) {
  foreach($mutual as $friend) {
    echo "<li>$friend <a data-role='button' href='account.php?member=$friend'>view account</a>" . "</li>";
  }
} else echo "<li>$member don't have any mutual friends</li>";
echo "</ul>";

?>

</div>
</body>
</html>