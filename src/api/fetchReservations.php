<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');

$connect = new DbConnect();
$connection = $connect->getConnection();

$sql = " CALL GetReservations() ";

$stmt = $connection->prepare($sql);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Query error: " . $connection->error]);
    exit;
}

// Fetch the results
$result = $stmt->get_result();

$reservations = [];
while ($row = $result->fetch_assoc()) {
    $reservations[] = $row;  // Collecting each row into an array
}

if (count($reservations) > 0) {
    // Returning the retrieved data as JSON
    echo json_encode(["status" => "success", "data" => $reservations]);
} else {
    echo json_encode(["status" => "error", "message" => "No reservations available."]);
}

$stmt->close();
$connection->close();
