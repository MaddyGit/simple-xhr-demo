<?php

function getQuoteOne($number){
    $raw = file_get_contents('./static/quotes/raw');
    $pattern = '/'.$number.'.*?[\n|\r|\r\n|\s]+–.*?[\n|\r|\r\n]/';
    preg_match($pattern, $raw, $matches);
    return $matches;
}

function getQuoteTwo($number){
    $raw = file_get_contents('../static/quotes/raw2');
    $patten = '/(.|[\n|\r|\r\n])*?--.*?[\n|\r|\r\n]/';
    preg_match_all($patten, $raw, $matches);
    return $matches[0][$number];
}

function add($num_one, $num_two){
    return $num_one + $num_two;
}

function multiply($num_one, $num_two){
    return $num_one * $num_two;
}

?>