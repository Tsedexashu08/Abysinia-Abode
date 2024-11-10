<?php

//connection
$conn = new mysqli("localhost", "root", "", "project");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if an image file is uploaded
if (isset($_FILES['image'])) {
    $imageData = file_get_contents($_FILES['image']['tmp_name']);

    // Prepare and execute SQL statement
    $stmt = $conn->prepare("INSERT INTO images (image) VALUES (?)");
    $stmt->bind_param("s", $imageData);
  
    if ($stmt->execute()) {
        echo "Image uploaded successfully.";
        header('location:index.php');
    } else {
        echo "Error uploading image: " . $stmt->error;
        header('location:index.php');
    }

    $stmt->close();
}

$conn->close();
?>
