<?php

session_start();
require_once '../function.php';

authenticate();

authorize($loggedin);

echo <<<_search
   <div id="search>
   <div data-role="fieldcontain">
   <input type='text' maxlength='16' placeholder="search users">
   <input type='submit' value='search'>
   </div>
   <ul class="result>
     // already prepare list in here.
   </ul>
   <script>
   // JavaScript for the search components
   </script>
   </div>
_search;

echo "<h4>Other users</h4>";

['mutual'=>$mutual, 'followers'=>$followers, 'following'=>$following] = set($user);

$result = queryMysql("SELECT user FROM members ORDER BY user");
$num = $result->num_rows;

for ($x = 0; $x < $num; ++$x) {
  $row = $result->fetch_array(MYSQLI_ASSOC);
  if ($row["user"] == $user) continue;
  else $member = $row["user"];
  echo "<li>";
  showPics($member, "member");
  echo "<a href='account.php?member=$member'>$member</a><span>";
  if (in_array($member, $mutual)) echo "You are mutual friends <button>Unfollow</button>";
  elseif (in_array($member, $follower)) echo "This user is following you <button>Follow back</button>";
  elseif (in_array($member, $following)) echo "You are following this user <button>Unfollow</button>";
  else echo "Not friends <button>Follow</button>";
  echo "</span></li>";
}



?>

</div>
</body>
</html>