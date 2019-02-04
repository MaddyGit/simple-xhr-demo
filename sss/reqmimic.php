<?php

if ($_SERVER['REQUEST_METHOD'] ===  'POST') {
    if (isset($_POST['Number'])) {
        $number = filter_var(trim($_POST['Number']), FILTER_SANITIZE_NUMBER_INT);
        require_once('./util.php');
        echo getQuoteTwo($number);
    }
    else echo 'Bad Request!';
}
else echo 'Bad Request!';

?>