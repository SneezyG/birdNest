<?php

session_start();
require_once '../function.php';

authenticate();

authorize($loggedin);

echo <<<_search
   <div id="search">
   <div data-role="fieldcontain">
   <input type='text' maxlength='16' placeholder="search users">
   <input type='submit' value='search'>
   </div>
   <ul class="result>
     // already prepare list in here
   </ul>
   <script>
   // JavaScript for the search components
   </script>
   </div>
_search;


echo "<h3>Previous chats</h3>";
$chatList = array();

// sort the query result with lastChatDate.
$result = queryMysql("SELECT user2, lastChatDate FROM chats WHERE user1='$user'");
$num = $result->num_rows;
if ($num) {
  for ($x=0 ; $x < $num ; ++$x ) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $chatList[$row[lastChatDate]] = $row[user2];
  }
}


echo "<ul>";
foreach($chatList as $chat) {
    echo "<li>";
    showPics($chat, "mutual");
     echo <<<_chatList
       <a href='account.php?member=$mutuals'>$mutuals</a>
       <span></span>
       <a href="chat.php?member=$" data-role="button">chat</a>
       <p>0 unread messages</p>
      </li>
_chatList
}
echo "</ul>";





echo "<h3>online friends</h3>";
$chatList = set($user)["mutuals"];

echo "<ul>";
foreach($chatList as $chat) {
  echo "<li>";
    showPics($chat, "mutual");
     echo <<<_chatList
       <a href='account.php?member=$mutuals'>$mutuals</a>
       <span></span>
       <a href="chat.php?member=$" data-role="button">chat</a>
      </li>
_chatList
}
echo "</ul>"

?>