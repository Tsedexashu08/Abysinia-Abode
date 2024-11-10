<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');

$connect = new DbConnect();
$connection = $connect->getConnection();

// Check connection
if ($connection->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $connection->connect_error]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['user_id']) || empty($data['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User ID is required."]);
    exit;
}

$user_id = $connection->real_escape_string($data['user_id']);
$sql = "CALL GetUserPurchaseHistory(?)";

$stmt = $connection->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Preparation error: " . $connection->error]);
    exit;
}

$stmt->bind_param("s", $user_id); // Assuming user_id is a string; adjust as needed

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Query error: " . $stmt->error]);
    exit;
}

// Fetch the results
$result = $stmt->get_result();
$reservations = [];

while ($row = $result->fetch_assoc()) {
    $reservations[] = $row;  // Collecting each row into an array
}

if (count($reservations) > 0) {
    echo json_encode(["status" => "success", "data" => $reservations]);
} else {
    echo json_encode(["status" => "success", "data" => [], "message" => "No reservations available."]);
}

$stmt->close();
$connection->close();
?>