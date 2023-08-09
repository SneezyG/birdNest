<?php

if (isset($_POST['from']) && $_POST['from'] == "member") {
  // do some logic.
  // probably return an array of html list.
}
elseif (isset($_POST['from']) && $_POST['from'] == "message") {
  // do some logic
  // probably return an array of html list.
}
else {
  return "incomplete request credentials";
}


?>