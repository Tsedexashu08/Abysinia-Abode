<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Content-Type: application/json');

include('DbConnection.php');

$connect = new DbConnect();
$connection = $connect->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['user_id']) || !isset($data['property_name'])) {
    echo json_encode(["status" => "error", "message" => "parameters not received bro!"]);
    exit;
}

$property_name = $connection->real_escape_string($data['property_name']);
$user_id = $connection->real_escape_string($data['user_id']);

$sql = "CALL SearchReservations(?, ?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param('ss', $user_id, $property_name);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Query error: " . $connection->error]);
    exit;
}

$result = $stmt->get_result();

$properties = [];
while ($row = $result->fetch_assoc()) {
    $properties[] = $row;
}

if (count($properties) > 0) {
    echo json_encode(["status" => "success", "data" => $properties]);
} else {
    echo json_encode(["status" => "error", "message" => "No reservations found"]);
}

$stmt->close();
$connection->close();
?>