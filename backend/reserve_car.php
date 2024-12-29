<?php
// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Capture the incoming request data
    $input = json_decode(file_get_contents('php://input'), true);

    // Log the incoming data for debugging
    file_put_contents('debug.log', print_r($input, true), FILE_APPEND);

    // Validate input data
    if (!isset($input['licenseNumber'], $input['car_id'], $input['office_id'], $input['pickupDate'], $input['returnDate'], $input['totalCost'])) {
        throw new Exception('Invalid input data. Required fields are missing.');
    }

    $license_number = $input['licenseNumber'];
    $car_id = $input['car_id'];
    $office_id = $input['office_id'];
    $pickup_date = $input['pickupDate'];
    $return_date = $input['returnDate'];
    $payment_amount = $input['totalCost'];

    // Database connection
    $db = new PDO("mysql:host=localhost;dbname=carrental", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insert reservation data into the table
    $query = "INSERT INTO reservation (license_number, car_id, office_id, pickup_date, return_date, payment_amount) 
              VALUES (:license_number, :car_id, :office_id, :pickup_date, :return_date, :payment_amount)";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':license_number' => $license_number,
        ':car_id' => $car_id,
        ':office_id' => $office_id,
        ':pickup_date' => $pickup_date,
        ':return_date' => $return_date,
        ':payment_amount' => $payment_amount,
    ]);

    // Respond with success
    echo json_encode(['status' => 'success', 'message' => 'Reservation confirmed.']);
} catch (Exception $e) {
    // Log the error message for debugging
    file_put_contents('error.log', $e->getMessage() . PHP_EOL, FILE_APPEND);

    // Respond with error
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
