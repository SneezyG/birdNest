<?php

if (isset($_POST['remove'])) {
 $remove = sanitizeString($_POST['remove']);
 queryMysql("DELETE FROM friends WHERE user='$remove' AND friend='$user'");
 echo "success";
}

if (isset($_POST['add'])) {
  $add = sanitizeString($_POST['add']);
  $result = queryMysql("SELECT * FROM friends WHERE user='$add' AND friend='$user'");
  if (!$result->num_rows)  {
    queryMysql("INSERT INTO friends VALUES ('$add', '$user')");
    echo "success";
  }
}



?>