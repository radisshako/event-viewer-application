<?php

    //path to the connection script
    require_once('connect.php');

    //create a query that gets all the event data from the database
    $query = "SELECT * FROM `events`";
    //send the query, and store the result in the variable contents 
    $contents = $connection->query($query);

    //json

    //an array to store json items
    $products = array();

    //if valid parse then add data to our array
    if($contents != FALSE){
        //add each rows values to the array
        while($row = $contents->fetch()) 
        {
            $products[] = $row;
        }
        echo json_encode($products);
        
    }



    ?>