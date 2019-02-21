<?php
$file = fopen('email-list.csv', 'a');
fputcsv($file, $_POST);
fclose($file);
?>