<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');


$connect = new DbConnect();
$connection = $connect->getConnection();
$data=json_decode(file_get_contents('php://input'),true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     $Property_id=$connection->real_escape_string($data['id']);

    $sql = "CALL DeleteProperties(?)";//using procedure for insertion to avoid sql injection.
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i',$Property_id);
    $result = $stmt->execute();
    if ($result) {
        echo json_encode(['message' => 'property deleted successfully', 'file' => $result]);
    } else {
        echo json_encode(['message' => 'Error while deleting: ' . $stmt->error]);
    }
    $stmt->close();
}
 $connection->close();
