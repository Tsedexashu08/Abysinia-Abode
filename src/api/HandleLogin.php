<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

//including our dbconnection class cause thats how we establish our db connection(IT'S  OBJECT ORIENTED CONNECTION BTW!)
include('DbConnection.php');



try {
    $connect = new DbConnect();
    $conn= $connect->getConnection();

    if ($conn->connect_error) {
        throw new Exception('Connection failed: ' . $conn->connect_error);
    }

    // Geting the input data sent from login page (the username & password the user entered).
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if username and password are set
    if (isset($data['username']) && isset($data['password'])) {
        $username = $conn->real_escape_string($data['username']);
        $password = $conn->real_escape_string(($data['password']));

        // checking if user credentials exist in the users table.
        $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
        $result = $conn->query($query);

        // Check if user exists
        if ($result->num_rows > 0) {
            // Fetch user data
            $user = $result->fetch_assoc();
            echo json_encode(['success' => true, 'data' => $user]);//this is how php sends data to html(it changes it to json format using json_encode function).
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Username and password are required']);
    }

    $conn->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>