<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');

$conn = new DbConnect();
$dbConnection = $conn->getConnection();

if ($dbConnection->connect_error) {
    die("Connection failed: " . $dbConnection->connect_error);
}

// Getting JSON input
$data = file_get_contents('php://input');

if (!isset($data) ){
    echo json_encode(["status" => "error", "message" => "Username not provided"]);
    exit;
}

$username =($data);//retrieving the user name from fetched data array.

$sql = "SELECT * FROM users WHERE username='$username'";

$result = $dbConnection->query($sql);

if (!$result) {
    echo json_encode(["status" => "error", "message" => "Query error: " . $dbConnection->error]);
    exit;
}

if ($result->num_rows > 0) {
    $responseData = [];
    while ($row = $result->fetch_assoc()) {
        $responseData[] = $row; // Collect all rows in the response data array
    }
    // Returning the retrieved data as JSON
    echo json_encode(["status" => "success", "data" => $responseData]);
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}

$dbConnection->close();