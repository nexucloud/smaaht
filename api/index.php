<?php

	$errors         = array();  	// array to hold validation errors
	$data 			= array(); 		// array to pass back data

	
    if ( ! empty($errors)) {

		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
		

	} else {

		// if there are no errors process our form, then return a message
		
		// Settings
		if (isset($_POST['listingType'])) {

		// DB Info
		$dbConnection = array(
				'host' => 'localhost',
				'user' => 'root',
				'password' => '',
				'db_name' => 'smaaht'
			);
		
		// DB Connection

		$dbc = mysqli_connect($dbConnection['host'],$dbConnection['user'], $dbConnection['password'], $dbConnection['db_name']) 
				OR die('Could not connect to MySQL: ' . mysqli_connect_error());		

		// Handle POST

	    $query = "INSERT INTO `directory`(`business_name`, `address`, `city`, `state`, `phone`, `website`, `email`, `category`, `listing_type`) 
	    		VALUES ('" . $_POST['businessName'] . "','" . $_POST['address'] . "','" . $_POST['city'] . "','" . $_POST['state'] . "','" . $_POST['phone'] . "','" . $_POST['website'] . "','" . $_POST['email'] . "','" . $_POST['category'] . "','" . $_POST['listingType'] . "')";

	    $results = mysqli_query($dbc, $query);

		// show a message of success and provide a true success variable
		$data['success'] = true;
		$data['message'] = 'Success!';
	}
	
	// return all our data to an AJAX call
	echo json_encode($data);
}

?>

	
	