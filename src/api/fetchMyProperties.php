<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');

$connect = new DbConnect();
$connection = $connect->getConnection();

$data = file_get_contents('php://input');

$user_id = $data;

$sql = "CALL FetchMyProperties(?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param('s', $user_id);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Query error: " . $connection->error]);
    exit;
}

// Fetch the results
$result = $stmt->get_result();

$properties = [];
while ($row = $result->fetch_assoc()) {
    $properties[] = $row;  // Collecting each row into an array
}

if (count($properties) > 0) {
    // Returning the retrieved data as JSON
    echo json_encode(["status" => "success", "data" => $properties]);
} else {
    echo json_encode(["status" => "error", "message" => "No properties available."]);
}

$stmt->close();
$connection->close();
