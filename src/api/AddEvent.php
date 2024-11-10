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
    $eventname = $_POST['title'] ;
    $propertyName = $_POST['property_name'] ;
    $description = $_POST['description'] ;
    $date=$_POST['event_date'];

    $sql = "CALL InsertEvent(?, ?, ?, ?)";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('ssss', $propertyName, $eventname, $description, $date);
    $result = $stmt->execute();
    
    echo json_encode(['status' => 'success', 'message' => 'Event added successfully.']);
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
                $upload_dir = 'uploads/'; 

                // Move the file to the desired location
                if (move_uploaded_file($file_tmp, $upload_dir . $file_name)) {
                    echo "File uploaded successfully: " . $file_name . "<br>";
                    $query="CALL InsertEventImage(?, ?)";
                    $stmt = $connection->prepare($query);
                    $path=$upload_dir.$file_name;
                    $stmt->bind_param('ss', $eventname,$path);
                    $result = $stmt->execute();
                    
                    echo json_encode(['status' => 'success', 'message' => 'Event images added successfully.']);
                } else {
                    echo "Failed to upload file: " . $file_name . "<br>";
                }
            } else {
                echo "Error uploading file: " . $file_name . " (Error Code: $file_error)<br>";
            }
        }
    }

    $connection->close();

   
   