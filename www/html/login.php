
<?php

session_start();
require_once '../function.php';

authenticate();

if ($loggedin) {
    redirect($user);
}

$error = $user = $pass = "";

if (isset($_POST['user'])) {
    $user = sanitizeString($_POST['user']);
    $pass = sanitizeString($_POST['pass']);
    
    if ($user == "" || $pass == "")
        $error = 'Not all fields were entered';
    else {
        $result = queryMySQL("SELECT user, pass FROM members WHERE user='$user'");
        if ($result->num_rows == 0) {
            $error = "Invalid login attempt, incorrect credentials";
        } 
        else {
           $row = $result->fetch_array(MYSQLI_ASSOC);
           $hash = $row['pass'];
           $verify = password_verify($pass, $hash);
           if ($verify) loginUser($user);
           else $error = "Invalid login attempt, incorrect credentials";
        }
    }
}


echo <<<_END
 <p class='info'>(You must be logged in to use this app)</p>
 <form method='post' action='login.php'>
 <div data-role='fieldcontain'>
 <label></label>
 <span class='error'>$error</span>
 </div>ko
 <div data-role='fieldcontain'>
 <label></label>
 Please enter your details to log in
 </div>
 <div data-role='fieldcontain'>
 <label>Username</label>
 <input type='text' maxlength='16' name='user' value='$user'>
 </div>
 <div data-role='fieldcontain'>
 <label>Password</label>
 <input type='password' maxlength='16' name='pass' value='$pass'>
 </div>
 <div data-role='fieldcontain'>
 <label></label>
 <input data-transition='slide' type='submit' value='Login'>
 </div>
 </form>
 </div>
 </body>
</html>
_END;


?>
