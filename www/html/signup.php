<?php

session_start();
require_once '../function.php';

authenticate();

if ($loggedin) {
    redirect($user);
}


 $error = $user = $pass = $country = "";

 if (isset($_POST['user'])) {
   $user = sanitizeString($_POST['user']);
   $pass = sanitizeString($_POST['pass']);
   $hash = password_hash($pass, PASSWORD_DEFAULT);
   $country = sanitizeString($_POST['country']);
   if ($user == "" || $pass == "" || $country == "") {
     $error = 'Not all fields were entered<br><br>';
   }
   else {
     $result = queryMysql("SELECT * FROM members WHERE user='$user'");
     if ($result->num_rows) {
       $error = 'That username already exists<br><br>';
     }
     else {
     queryMysql("INSERT INTO members VALUES('$user', '$hash')");
     queryMysql("INSERT INTO profiles VALUES('$user', '$country')");
     echo "<h4>Your account have been created successfully</h4>";
     loginUser($user);
     }
   }
 }
 
 
echo <<<_END
 <form method='post' action='signup.php'>$error
 <div data-role='fieldcontain'>
 <label></label>
 Please enter your details to sign up
 </div>
 <div data-role='fieldcontain'>
 <label>Username</label>
 <input type='text' maxlength='16' name='user' value='$user' onBlur='checkUser(this)' required>
 <label></label><div id='used'>&nbsp;</div>
 </div>
 <div data-role='fieldcontain'>
 <label>Country</label>
 <select>
  <option selected> ----- </option>
_END;

 foreach ($countryFlags as $country => $flag) {
    echo "<option value="$country"> $country $flag</option>";
 }

echo <<<_END
 </select>
 </div>
 <div data-role='fieldcontain'>
 <label>Password</label>
 <input type='text' maxlength='16' name='pass' value='$pass' required>
 </div>
 <div data-role='fieldcontain'>
 <label></label>
 <input type='submit' value='Sign Up'>
 </div>
 </form>
 </div>
 </body>
</html>
_END;



?>