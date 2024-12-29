<?php
// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

// Enable error logging
$logFile = "debug.log";
ini_set("log_errors", 1);
ini_set("error_log", $logFile);
error_log("------ New Request ------");

// Database connection
$mysqli = new mysqli("localhost", "root", "", "carrental");

if ($mysqli->connect_error) {
    error_log("Database Connection Error: " . $mysqli->connect_error);
    die("Connection failed: " . $mysqli->connect_error);
}

$input = json_decode(file_get_contents('php://input'), true);

$carInfo = $input['carInfo'] ?? '';
$customerInfo = $input['customerInfo'] ?? '';
$reservationDate = $input['reservationDate'] ?? '';

error_log("Received Input: " . print_r($input, true));

// Initialize query and parameters
$query = '';
$params = [];
$types = '';

// Determine which type of search to perform
if (!empty($carInfo)) {
    // Search for cars
    $query = "SELECT *
              FROM car c
              WHERE c.model LIKE ? OR c.plate_id LIKE ? OR c.brand LIKE ? OR c.color LIKE ?";
    $types = 'ssss';
    $params = ["%$carInfo%", "%$carInfo%", "%$carInfo%", "%$carInfo%"];
    error_log("Car Info Search Query: " . $query);
} elseif (!empty($customerInfo)) {
    // Search for customers
    $query = "SELECT cu.license_number, cu.name, cu.phone, cu.email
              FROM customer cu
              WHERE cu.name LIKE ? OR cu.phone LIKE ? OR cu.license_number LIKE ? OR cu.email LIKE ?";
    $types = 'ssss';
    $params = ["%$customerInfo%", "%$customerInfo%", "%$customerInfo%", "%$customerInfo%"];
    error_log("Customer Info Search Query: " . $query);
} elseif (!empty($reservationDate)) {
    // Search for reservations
    $query = "SELECT r.reservation_id, r.pickup_date, r.return_date, r.payment_amount, 
                     c.model AS car_model, cu.name AS customer_name
              FROM reservation r
              INNER JOIN car c ON r.car_id = c.car_id
              INNER JOIN customer cu ON r.license_number = cu.license_number
              WHERE DATE(r.pickup_date) = ?";
    $types = 's';
    $params = [$reservationDate];
    error_log("Reservation Search Query: " . $query);
}

if (empty($query)) {
    error_log("No valid input provided for search.");
    echo json_encode([]);
    exit();
}

try {
    // Prepare the statement
    $stmt = $mysqli->prepare($query);

    if ($stmt === false) {
        throw new Exception("Query Preparation Failed: " . $mysqli->error);
    }

    // Bind parameters if applicable
    if (!empty($types)) {
        $stmt->bind_param($types, ...$params);
        error_log("Query Parameters: " . print_r($params, true));
    }

    // Execute the query
    $stmt->execute();

    // Fetch results
    $result = $stmt->get_result();
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Log fetched data
    error_log("Fetched Data: " . print_r($data, true));

    // Return JSON response
    echo json_encode($data);

    // Close statement
    $stmt->close();
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo json_encode(["error" => $e->getMessage()]);
}

// Close database connection
$mysqli->close();
error_log("------ Request End ------");
?>
