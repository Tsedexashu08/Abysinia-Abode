<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');
$connect = new DbConnect();
$connection = $connect->getConnection();


// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetching values from the POST request
    $user_id = $_POST['user_id'] ;
    $checkIn = $_POST['CheckIn'] ;
    $checkOut = $_POST['CheckOut'] ;
    $guests=$_POST['Guests'];
    $property_id=$_POST['propertyId'];

    $sql = "CALL InsertReservation(?, ?, ?, ?,?)";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('sssss', $user_id, $property_id, $checkIn, $checkOut,$guests);
    $result = $stmt->execute();
    
    echo json_encode(['status' => 'success', 'message' => 'Reservation made successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'something went wrong when making your resevation.']);
}



    $connection->close();

   
   