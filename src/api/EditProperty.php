<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');
$connect = new DbConnect();
$connection = $connect->getConnection();

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

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetching values from the POST request
    $propertyname = $_POST['name'] ?? '';
    $property_id = $_POST['property_id'] ?? '';
    $propertyType = $_POST['property_type'] ?? '';
    $location = $_POST['location'];
    $bedrooms = $_POST['bedrooms'] ?? 0;
    $bathrooms = $_POST['bathrooms'] ?? 0;
    $occupancy = $_POST['occupancy'] ?? 0;
    $user_id = $_POST['user_id'];
    $forsale=$_POST['for_sale'];

    // Handle amenities
    if (isset($_POST['amenities'])) {
        $amenities = concatenateWithCommas($_POST['amenities']); // Join amenities with commas(since we retrive em as array)
    }//we send em to our procedure as a comma separated string.

    $price = $_POST['price'] ?? 0.0;
    $description = $_POST['description'] ?? '';

    $availabilityStart = $_POST['availability-start'] ?? '';
    $availabilityEnd = $_POST['availability-end'] ?? '';
    $availabilty = isAvailabilityValid($availabilityStart, $availabilityEnd);//calculate if its available or not.

    $rules = $_POST['rules'] ?? '';
    $cancellation = $_POST['cancellation_policy'] ?? '';
    $size = $_POST['property_size'] ?? 0;
    $deposit = $_POST['deposit'] ?? 0.0;


    $sql = "CALL UpdatePropertyWithAmenities(?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('ssssssssssss',$property_id, $user_id, $propertyType, $propertyname, $description, $price,$forsale, $location, $availabilty, $cancellation, $size, $amenities);
    $result = $stmt->execute();

    echo json_encode(['status' => 'success', 'message' => 'Property Udated successfully.']);
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
