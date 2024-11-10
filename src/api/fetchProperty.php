<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');

$connect = new DbConnect();
$connection = $connect->getConnection();


$data = json_decode(file_get_contents('php://input'),true);

if (!isset($data) ){
    echo json_encode(["status" => "error", "message" => "id not recieved bro!"]);
    exit;
}
$property_id = $data['id'];

$sql = "CALL FetchPropertyById(?)";  
$stmt = $connection->prepare($sql);
$stmt->bind_param('s', $property_id);

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
    echo json_encode(["status" => "success", "data" => $properties]);
} else {
    echo json_encode(["status" => "error", "message" => $property_id]);
}

$stmt->close();
$connection->close();
?>