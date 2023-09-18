<?php  
    //CONNECTION SCRIPT CREATING LINK TO OUR DATABASE
    //try to connect to the databse
    try{
        //construct a pdo object called connection
        $connection = new PDO('mysql:host=x0;dbname=x1','x2', 'x3');
        
    }
    //if you cant establish a connection
    catch(PDOException $ex){
        //display an error message
        echo "Databse connection error occured " .$ex->getMessage();
        exit();
    }

    ?>  
