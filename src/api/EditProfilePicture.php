<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
include('DbConnection.php');

$connect = new DbConnect();
$connection = $connect->getConnection();



// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     $user_id=$_POST['user_id'];
     
     //uploading and updating image in the db if image was selected.
if (isset($_FILES['profile_pic']) && !empty($_FILES['profile_pic']['name'][0])) {

        $file_name = $_FILES['profile_pic']['name']; // Original file name
            $file_tmp = $_FILES['profile_pic']['tmp_name']; // Temporary file path
            $file_size = $_FILES['profile_pic']['size']; // File size
            $file_error = $_FILES['profile_pic']['error']; // Error status

            // Check for upload errors
            if ($file_error === UPLOAD_ERR_OK) {
                // Define the upload directory
                $upload_dir = 'uploads/'; // Ensure this directory exists and is writable

                // Move the file to the desired location
                if (move_uploaded_file($file_tmp, $upload_dir . $file_name)) {
                    echo "File uploaded successfully: " . $file_name . "<br>";
                    $query="UPDATE users 
                            SET profile_pic=?
                            WHERE user_id=?";
                    $path=$upload_dir.$file_name;
                    $stmt = $connection->prepare($query);
                    $stmt->bind_param('ss',$path,$user_id);
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
