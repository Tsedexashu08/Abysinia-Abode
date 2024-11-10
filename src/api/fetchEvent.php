<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');

$connect = new DbConnect();
$connection = $connect->getConnection();

$data = file_get_contents('php://input');

$event_name = $data;

$sql = " CALL GetEventsByEventName(?) ";

$stmt = $connection->prepare($sql);
$stmt->bind_param('s', $event_name);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Query error: " . $connection->error]);
    exit;
}

// Fetch the results
$result = $stmt->get_result();

$event = [];
while ($row = $result->fetch_assoc()) {
    $event[] = $row;  // Collecting each row into an array
}

if (count($event) > 0) {
    // Returning the retrieved data as JSON
    echo json_encode(["status" => "success", "data" => $event]);
} else {
    echo json_encode(["status" => "error", "message" => "No events available."]);
}

$stmt->close();
$connection->close();
