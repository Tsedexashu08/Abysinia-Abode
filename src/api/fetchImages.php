<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
// Return the images as JSON
header('Content-Type: application/json');

$host = 'localhost';
$db = 'project'; 
$user = 'root';             
$pass = '';                 

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$name='tsedex';
// Fetch images
$sql = "SELECT id, image FROM images";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $images[] = [
            'id' => $row['id'],
            'image' => base64_encode($row['image']), // Convert BLOB to base64
        ];
    }
}

echo json_encode($images);
echo 'fetching images...';

$conn->close();
?>