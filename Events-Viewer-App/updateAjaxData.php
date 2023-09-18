<?php
    //path to the connection script
    require_once('connect.php');

    //get the json data from the input stream
    $jsondata = file_get_contents("php://input");
    //decode the data
    $data = json_decode($jsondata, true);
    //get the id and notes and assin to a variable
    $id = $data['id'];
    $notes = $data['notes'];


    //query with id and notes
    $query = "UPDATE `events` SET `notes` = '".$notes."' WHERE `id`='".$id."'";
   
    //if a connection occurs update the database
    if($connection->query($query)){
        echo "Record Was Updated";
    }
    else{
        // display an error
        echo "Error in updating database: ";
    }



    ?>