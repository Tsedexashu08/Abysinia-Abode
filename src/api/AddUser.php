<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
include('DbConnection.php');

$connect = new DbConnect();
$connection = $connect->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve user data from POST request
    $fname = isset($_POST['fname']) ? $_POST['fname'] : '';
    $mname = isset($_POST['mname']) ? $_POST['mname'] : '';
    $lname = isset($_POST['lname']) ? $_POST['lname'] : '';
    $fullname = trim($fname . ' ' . $mname . ' ' . $lname);
    $dob = $_POST['dob'];
    $nationality = $_POST['nationality'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    $user = $_POST['user'];
    $password = $_POST['password'];
    $accountType = isset($_POST['accountType'])?$_POST['accountType']:'customer';

    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
        // Set the upload directory
        $uploadDir = 'uploads/'; // Ensure this directory exists and is writable
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true); // Create the directory if it doesn't exist
        }
        $fileTmpPath = $_FILES['profile_pic']['tmp_name'];
        $fileName = $_FILES['profile_pic']['name'];
        $fileSize = $_FILES['profile_pic']['size'];
        $fileType = $_FILES['profile_pic']['type'];
        // Create a unique file name to prevent overwriting
        $newFileName = uniqid() . '_' . basename($fileName);
        $destPath = $uploadDir . $newFileName;
        // Move the uploaded file to the designated folder
        if (move_uploaded_file($fileTmpPath, $destPath)) {
            $sql = "CALL InsertUser(?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param('sssssssss', $destPath, $fullname, $dob, $nationality, $user, $email, $tel, $password, $accountType);
            $result = $stmt->execute();
            if ($result) {
                echo json_encode(['message' => 'User registered successfully', 'file' => $destPath]);
            } else {
                echo json_encode(['message' => 'Error while registering: ' . $stmt->error]);
            }
        } else {
            echo json_encode(['message' => 'Error moving the uploaded file']);
        }
    } else {
        echo json_encode(['message' => 'No file uploaded or upload error']);
    }
    $stmt->close();
} else {
    echo json_encode(['message' => 'Invalid request method']);
}

$connection->close();
