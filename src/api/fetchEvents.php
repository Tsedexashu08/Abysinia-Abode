<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');

$connect=new DbConnect();
$connection=$connect->getConnection();

$sql = "CALL GetEventsWithImages()";
$result = $connection->query($sql);

if (!$result) {
    echo json_encode(["status" => "error", "message" => "Query error: " . $connection->error]);
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
    echo json_encode(["status" => "error", "message" => "no events availabe..."]);
}

$connection->close();

