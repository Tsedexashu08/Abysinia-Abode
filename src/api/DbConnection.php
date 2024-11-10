<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

class DbConnect {
    
    private $host = 'localhost';
    private $db = 'airbnb'; 
    private $user = 'root';             
    private $pass = '';                 
    private $conn;

    // Constructor to create a connection
    public function __construct() {
        $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->db);
        
    
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
    public function getConnection() {
        return $this->conn;
    }
}
?>