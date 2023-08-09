<?php

 $dbhost = 'localhost'; // database host name
 $dbname = 'birdnest'; // database name
 $dbuser = 'eagle'; // database user
 $dbpass = 'Eagle@2111'; // database user password
 
 // make a connection to birdnest database
 $connection = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
 if ($connection->connect_error) fatal();

 function createTable($name, $query) {
     queryMysql("CREATE TABLE IF NOT EXISTS $name($query)");
     echo "Table '$name' created or already exists.<br>";
 }

 function queryMysql($query) {
     global $connection;
     $result = $connection->query($query);
     if (!$result) fatal();
     return $result;
 }

 function fatal() {
     die("<h2> SERVER ERROR </h2>");
 }
 
 function authenticate() {
    global $userstr, $user, $loggedin;
    $userstr = 'Welcome Guest';
    $user = "guest";
    $loggedin = FALSE;
    
    if (isset($_SESSION['user'])) {
        $user = $_SESSION['user'];
        $loggedin = TRUE;
        $userstr = "Logged in as: $user";
    }
 }
 
 function authorize($loggedin) {
    if (!$loggedin) {
      echo <<<_auto
      <p class='info'>(You must be logged in to use this app) go to <a data-role='button' data-icon='check' href="/login.php"> login </a> </p>
      </div>
      </body>
      </html>
_auto
      exit();
    }
  }


 function loginUser($user) {
   $_SESSION['user'] = $user;
   redirect($user);
 }
 
 function redirect($user) {
   echo <<<_log
     You are now logged in as $user, Redirecting you in <span id='count' style='color:red; font-size:20px;'>3</span>s.
     </div>
     <script>
       $('document').ready(function() {
         let elem = $('#count');
         let counter = 5;
         let timer = setInterval(() => {
           counter--;
           if (counter>=0) elem.html(counter);
           else clearInterval(timer);
         }, 1000);
       });
     </script>
     </body>
     </html>
_log;
   header("Refresh: 5; url=http://localhost:8080/profile.php");
 }

 function destroySession() {
     $_SESSION=array();
     setcookie(session_name(), '', time()-2592000, '/');
     session_destroy();
 }

 function sanitizeString($var) {
     global $connection;
     $var = strip_tags($var);
     $var = htmlentities($var);
     if (get_magic_quotes_gpc())
         $var = stripslashes($var);
     return $connection->real_escape_string($var);
 }

 function showPics($user, $class) {
   if (file_exists("user/images/$user.jpg")) {
         echo "<img class=$class src='user/images/$user.jpg' style='float:left;'>";
   }
   else {
       echo "<img class=$class src='asset/userIcon.jpg' style='float:left;'>";
   }
 }
 
 function showProfile($user, $text, $country, $date) {
     showPics($user, "account");
     
     echo "<h6>$country<span>";
     echo $countryFlags[$country] . "</span></h6>";
     if ($text != "") echo $text . "<br style='clear:left;'><br>";
     else echo "<p>Nothing to see here, yet</p><br>";
     echo "<p>Joined(";
     echo dateFormat($date, "date") . ")</p>";
 }


function notFound() {
  die("<h2> PAGE NOT FOUND </h2>");
}


function dateFormat($dateString, $format) {
  $datetime = new DateTime($dateString);
  if ($format == "date") return $datetime->format('Y-m-d');
  elseif ($format == "time") return $datetime->format('H:m:s');
  else return $datetime->format('Y-m-d H:m:s');
}


function set($user) {
  $followers = array();
  $following = array();
   
  $result = queryMysql("SELECT * FROM friends WHERE user='$user'");
  $num = $result->num_rows;
  
  for ($j = 0 ; $j < $num ; ++$j) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $followers[$j] = $row['friend'];
  }
  
  $result = queryMysql("SELECT * FROM friends WHERE friend='$user'");
  $num = $result->num_rows;
   
  for ($j = 0 ; $j < $num ; ++$j) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $following[$j] = $row['user'];
  }
  
  $mutual = array_intersect($followers, $following);
  $followers = array_diff($followers, $mutual);
  $following = array_diff($following, $mutual);
  
  return [
      'mutuals' => $mutuals,
      'followers' => $followers,
      '$following' => $following,
    ];
}


function layout() {
  global $user, $userstr, $loggedin;
echo <<<_INIT
<!DOCTYPE html>
<html>
 <head>
 <meta charset='utf-8'>
 <meta name='viewport' content='width=device-width, initial-scale=1'>
 <link rel='stylesheet' href='asset/jquery.mobile-1.4.5.min.css'>
 <link rel='stylesheet' href='asset/styles.css'>
 <script src='asset/script.js'></script>
 <script src='asset/jquery-3.7.0.min.js'></script>
 <script src='asset/jquery.mobile-1.4.5.min.js'></script>
 <title>Bird's Nest: $user</title>
 </head>
 <body>
 <div data-role='page'>
 <div data-role='header'>
 <div id='logo' 
 class='center'>B<img id='bird' src='asset/bird.gif'>ird's Nest</div>
 <div class='username'>$userstr</div>
 </div>
 <div data-role='content'>
_INIT;


if ($loggedin) {
echo <<<_LOGGEDIN
 <div class='center'>
 <a data-role='button' data-inline='true' data-icon='home' href='index.php?home'>Home</a>
 <a data-role='button' data-inline='true' href='members.php'>Members</a>
 <a data-role='button' data-inline='true' href='friends.php'>Friends</a>
 <a data-role='button' data-inline='true' href='chat.php'>Chats</a>
 <a data-role='button' data-inline='true' href='profile.php'>Edit Profile</a>
 <a data-role='button' data-inline='true' href='logout.php'>Log out</a>
 </div>
 
_LOGGEDIN;

}else {
echo <<<_GUEST
 <div class='center'>
 <a data-role='button' data-inline='true' data-icon='home' href='index.php'>Home</a>
 <a data-role='button' data-inline='true' data-icon='plus' href='signup.php'>Sign Up</a>
 <a data-role='button' data-inline='true' data-icon='check' href='login.php'>Log In</a>
 </div>
 
_GUEST;
}

}


$countryFlags = array(
    'Afghanistan' => '&#x1F1E6;&#x1F1EB;',
    'Argentina' => '&#x1F1E6;&#x1F1F7;',
    'Australia' => '&#x1F1E6;&#x1F1FA;',
    'Brazil' => '&#x1F1E7;&#x1F1F7;',
    'Canada' => '&#x1F1E8;&#x1F1E6;',
    'China' => '&#x1F1E8;&#x1F1F3;',
    'Egypt' => '&#x1F1EA;&#x1F1EC;',
    'France' => '&#x1F1EB;&#x1F1F7;',
    'Germany' => '&#x1F1E9;&#x1F1EA;',
    'India' => '&#x1F1EE;&#x1F1F3;',
    'Italy' => '&#x1F1EE;&#x1F1F9;',
    'Japan' => '&#x1F1EF;&#x1F1F5;',
    'Mexico' => '&#x1F1F2;&#x1F1FD;',
    'Nigeria' => '&#x1F1F3;&#x1F1EC;',
    'Russia' => '&#x1F1F7;&#x1F1FA;',
    'South Africa' => '&#x1F1FF;&#x1F1E6;',
    'South Korea' => '&#x1F1F0;&#x1F1F7;',
    'Spain' => '&#x1F1EA;&#x1F1F8;',
    'Turkey' => '&#x1F1F9;&#x1F1F7;',
    'United Kingdom' => '&#x1F1EC;&#x1F1E7;',
    'United States' => '&#x1F1FA;&#x1F1F8;',
);


?>
