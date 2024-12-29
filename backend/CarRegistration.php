<?php
// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "carrental";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
    exit();
}

$model = $data['model'];
$year = $data['year'];
$plate_id = $data['plate_id'];
$brand = $data['brand'];
$price_per_day = $data['price_per_day'];
$color = $data['color'];
$office_id = $data['office_id'];
$status = $data['status'];

error_log("Model: $model, Year: $year, Plate ID: $plate_id, Brand: $brand, Price Per Day: $price_per_day, Color: $color, Office ID: $office_id, Status: $status");

$sql_check = "SELECT * FROM car WHERE plate_id = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $plate_id);
$stmt_check->execute();

if ($stmt_check->fetch()) {
    echo json_encode(["status" => "error", "message" => "This car is already registered."]);
    exit();
}

$sql = "INSERT INTO car (model, year, plate_id, brand, price_per_day, color, office_id, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sissdsss", $model, $year, $plate_id, $brand, $price_per_day, $color, $office_id, $status);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Car registered successfully."]);
} else {
    error_log("SQL Error: " . $conn->error);
    echo json_encode(["status" => "error", "message" => "Failed to register car."]);
}

$stmt->close();
$conn->close();
?>
