<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');
$connect = new DbConnect();
$connection = $connect->getConnection();


// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetching values from the POST request
    $propertyname = $_POST['title'] ;
    $propertyType = $_POST['property_type'] ;
    $street = $_POST['street'] ?? '';
    $city = $_POST['city'] ?? '';
    $state = $_POST['state'] ?? '';
    $zip = $_POST['zip'] ?? '';

    $location = $street . '/' . $state . '/' . $city . '/' . $zip . '/';
    //contatinating to set location.
    $country = $_POST['country'] ?? '';
    $bedrooms = $_POST['bedrooms'] ?? 0;
    $bathrooms = $_POST['bathrooms'] ?? 0;
    $occupancy = $_POST['occupancy'] ?? 0;
    $user_id = $_POST['user_id'];
    
    // Handle amenities
    if (isset($_POST['amenities'])) {
        $amenities = concatenateWithCommas($_POST['amenities']); // Join amenities with commas
    }
    
    $price = $_POST['price'] ?? 0.0;
    $description = $_POST['description'] ?? '';
    
    $availabilityStart = $_POST['availability-start'] ?? '';
    $availabilityEnd = $_POST['availability-end'] ?? '';
    $availabilty = isAvailabilityValid($availabilityStart, $availabilityEnd);
    
    $rules = $_POST['rules'] ?? '';
    $cancellation = $_POST['cancellation'] ?? '';
    $size = $_POST['size'] ?? 0;
    $deposit = $_POST['deposit'] ?? 0.0;
    $for_sale = $_POST['forsale']??'false';
    
    $sql = "CALL InsertPropertyWithAmenities(?,?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('ssssssssssssssss', $user_id, $propertyType, $propertyname, $description, $price,$for_sale, $location, $availabilty, $cancellation, $size, $amenities,$rules,$deposit,$occupancy,$bedrooms,$bathrooms);
    $result = $stmt->execute();
    
    echo json_encode(['status' => 'success', 'message' => 'Property added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

//uploading and storing images in the db if images were selected.
if (isset($_FILES['images']) && !empty($_FILES['images']['name'][0])) {
    // Loop through each file
    foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
        $file_name = $_FILES['images']['name'][$key]; // Original file name
            $file_tmp = $_FILES['images']['tmp_name'][$key]; // Temporary file path
            $file_size = $_FILES['images']['size'][$key]; // File size
            $file_error = $_FILES['images']['error'][$key]; // Error status

            // Check for upload errors
            if ($file_error === UPLOAD_ERR_OK) {
                // Define the upload directory
                $upload_dir = 'uploads/'; // Ensure this directory exists and is writable

                // Move the file to the desired location
                if (move_uploaded_file($file_tmp, $upload_dir . $file_name)) {
                    echo "File uploaded successfully: " . $file_name . "<br>";
                    $query="CALL InsertPropertyImages(?, ?)";
                    $stmt = $connection->prepare($query);
                    $path=$upload_dir.$file_name;
                    $stmt->bind_param('ss', $propertyname,$path);
                    $result = $stmt->execute();
                    
                    echo json_encode(['status' => 'success', 'message' => 'Property images added successfully.']);
                } else {
                    echo "Failed to upload file: " . $file_name . "<br>";
                }
            } else {
                echo "Error uploading file: " . $file_name . " (Error Code: $file_error)<br>";
            }
        }
    }

    $connection->close();

    function concatenateWithCommas($array)
    { // Check if the array is not empty
        if (!empty($array)) {
            // Use implode to join array elements with commas
            return implode(', ', $array);
        }
        return '';
    }
    
    function isAvailabilityValid($availabilityStart, $availabilityEnd)//this function we use to validate if a property is available(by using the start & end availability attributtes).
    {
        // Check if both dates are provided
        if (empty($availabilityStart) || empty($availabilityEnd)) {
            return false; // One or both dates are missing
        }
    
        // Convert the dates to timestamps for comparison
        $startTimestamp = strtotime($availabilityStart);
        $endTimestamp = strtotime($availabilityEnd);
    
        // Check if the timestamps are valid
        if ($startTimestamp === false || $endTimestamp === false) {
            return false; // Invalid date format
        }
    
        // Return true if start date is before end date, otherwise false
        return $startTimestamp < $endTimestamp;
    }