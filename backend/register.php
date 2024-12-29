<?php
// Enable CORS (Optional)
header("Access-Control-Allow-Origin: http://localhost:5173"); // Replace with your frontend URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-XSRF-TOKEN, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies)

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // Return a 200 OK response to preflight OPTIONS request
}

// Database connection
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "carrental"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if the data is valid
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
    exit;
}

// Extract the values from the form data
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$licenseNumber = $data['licenseNumber'];
$password = password_hash($data['password'], PASSWORD_DEFAULT); // Hash password

// Check if the customer already exists (based on email or phone)
$sql_check = "SELECT * FROM customer WHERE email = '$email' OR phone = '$phone'";
$result = $conn->query($sql_check);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Customer already exists with this email or phone number."]);
    exit;
}

// Insert customer data into the customer table
$sql = "INSERT INTO customer (name, email, phone, license_number, password) 
        VALUES ('$name', '$email', '$phone', '$licenseNumber', '$password')";

// Execute the query
if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Customer registered successfully."]);
} else {
    // Log the exact error message for debugging
    error_log("SQL Error: " . $conn->error);
    echo json_encode(["status" => "error", "message" => "Failed to register customer."]);
}

// Close connection
$conn->close();
?>
