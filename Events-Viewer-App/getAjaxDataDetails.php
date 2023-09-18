<?php

    //path to connection script
    require_once('connect.php');

    //get the data posted 
    $data = $_POST['id'];
    
    //query with the data psoted as id
    $query = "SELECT * FROM `events` WHERE `id` = '".$data."'"; 
    //send the query, and store the result in the variable contents 
    $contents = $connection->query($query);

    //an array to store json items
    $products = array();

    //if valid parse teh data and add it to our array
    if($contents != FALSE){
        //add each rows values to the array
        while($row = $contents->fetch()) 
        {
            $products[] = $row;
        }
        echo json_encode($products);
        
    }
    





    ?>