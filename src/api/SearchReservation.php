<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Content-Type: application/json');

include('DbConnection.php');

$connect = new DbConnect();
$connection = $connect->getConnection();

$data =json_decode(file_get_contents('php://input'),true);//putting the data recieved from html in a variable(after converting it to json)

// Check if the required parameters are present
if (!isset($data['user_id']) || !isset($data['property_name'])) {
    echo json_encode(["status" => "error", "message" => "parameters not received bro!"]);
    exit;
}

$property_name =$connection-> real_escape_string($data['property_name']);//retriving userid and propertyname if they where sent from html.
$user_id =$connection-> real_escape_string($data['user_id']);

$sql = "CALL SearchReservations(?, ?)";  
$stmt = $connection->prepare($sql);
$stmt->bind_param('ss', $user_id, $property_name);//using the retrieved data to search reservation with our procedure above.

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Query error: " . $connection->error]);
    exit;
}

// Fetch the results
$result = $stmt->get_result();

$properties = [];
while ($row = $result->fetch_assoc()) {//if query returns data set the properties array(then send it to the html.)
    $properties[] = $row;  // Collecting each row into an array
}

if (count($properties) > 0) {//sending the queried data in json format.
    echo json_encode(["status" => "success", "data" => $properties]);
} else {
    echo json_encode(["status" => "error", "message" => 'no reservations found']);
}

$stmt->close();
$connection->close();
?>