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
$data = file_get_contents('php://input');//fetching the id of current user from edit form.

if (!isset($data) ){
    echo json_encode(["status" => "error", "message" => "No user with that id!"]);
    exit;
}

$user_id =($data);//retrieving the user id from fetched data array.

$sql = "SELECT * FROM users WHERE user_id='$user_id'";//fetching the current logged in user.

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