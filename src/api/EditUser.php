<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

include('DbConnection.php');


$connect = new DbConnect();
$connection = $connect->getConnection();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the updated user data from POST request.
    $fullname = $_POST['full_name'];
    $dob = $_POST['age'];
    $nationality = $_POST['nationality'];
    $tel = $_POST['phone_no'];
    $email = $_POST['email'];
    $user = $_POST['username'];
    $password = $_POST['password'];
    $id=$_POST['user_id'];
    $accountType = $_POST['accountType'];

    $sql = "CALL UpdateUser(?,?, ?, ?, ?, ?, ?, ? )";//using procedure for insertion to avoid sql injection.
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('ssssssss',$fullname, $dob, $nationality, $user, $email, $tel, $password,$id);
    $result = $stmt->execute();
    if ($result) {
        echo json_encode(['message' => 'Account updated successfully', 'file' => $result]);
    } else {
        echo json_encode(['message' => 'Error while updating: ' . $stmt->error]);
    }
    $stmt->close();
}
 $connection->close();
