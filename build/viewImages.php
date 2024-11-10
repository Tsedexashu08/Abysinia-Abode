<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch images from the database
$sql = "SELECT * FROM images";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $imageData = base64_encode($row['image']);
        echo '<div style="margin: 10px; display: inline-block;">';
        echo '<img src="data:image/png;base64,' . $imageData . '" width="200" height="200" />';
        echo '</div>';
    }
} else {
    echo "No images found.";
}

$conn->close();
?>