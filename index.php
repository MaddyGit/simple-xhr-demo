<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SERVER['HTTP_REQUESTING']) && isset($_SERVER['HTTP_NUMBER'])) {
        $requsted = filter_var(trim($_SERVER['HTTP_REQUESTING']), FILTER_SANITIZE_STRING);
        $number = filter_var(trim($_SERVER['HTTP_NUMBER']), FILTER_SANITIZE_NUMBER_INT);
    
        switch($requsted){
            case 'quote':
                require_once('./sss/util.php');
                $match = getQuoteOne($number);
                $quote = $match[0];
                echo preg_replace('/.*?“/', '“', $quote);
                break;

            case 'quote_indirect':
                $data = http_build_query(array('Number'=>$number));
                $options = array(
                    'http' => array(
                        'method' => 'POST' ,
                        'header' => 'Content-Type: application/x-www-form-urlencoded'
                        , 'content' => $data
                    )
                );
                $context = stream_context_create($options);
                $read = file_get_contents('http://localhost/echosome/sss/reqmimic.php', false, $context);
                echo $read;
                break;
    
            case 'image':
                $data = file_get_contents('./static/pics/'.$number.'.jpg');
                echo $data;
                break;

            case 'calcform':
                require_once('./templates/calcform.html');
                break;

            case 'calcformcalc':
                if (isset($_POST['numberone']) && isset($_POST['numbertwo'])) {
                    $number_one = intval(filter_var(trim($_POST['numberone']), FILTER_SANITIZE_NUMBER_INT));
                    $number_two = intval(filter_var(trim($_POST['numbertwo']), FILTER_SANITIZE_NUMBER_INT));

                    require_once('./sss/util.php');
                    echo 'Sum: '. add($number_one, $number_two) .'  -  ';
                    echo 'Product: '. multiply($number_one, $number_two);
                }
                else echo 'Bad Request!';
                break;

            case 'embedvideo':
                require_once('./templates/embedvideo.html');
                break;
    
            default:
                echo 'Bad Request!';
                break;
        }
    }
    else echo 'Bad Request!';
}
else{
    require_once('./templates/frontpage.html');
}

?>