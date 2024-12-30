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
    if (!isset($input['pickupDate'], $input['returnDate'], $input['pickupLocation'])) {
        throw new Exception('Invalid input data. Required fields are missing.');
    }

    $pickup_date = $input['pickupDate'];
    $return_date = $input['returnDate'];
    $pickup_location = $input['pickupLocation'];

    // Database connection
    $db = new PDO("mysql:host=localhost;dbname=carrental", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the office_id for the given city (not location)
    $office_query = "SELECT office_id FROM office WHERE city = :pickup_location LIMIT 1";
    $office_stmt = $db->prepare($office_query);
    $office_stmt->execute([':pickup_location' => $pickup_location]);
    $office = $office_stmt->fetch(PDO::FETCH_ASSOC);

    if (!$office) {
        throw new Exception('No office found for the given location.');
    }

    $office_id = $office['office_id'];

    // Query to fetch available cars
    $query = "
        SELECT c.*
        FROM car c
        WHERE c.office_id = :office_id
        AND c.car_id NOT IN (
            SELECT r.car_id
            FROM reservation r
            WHERE r.car_id = c.car_id
            AND NOT (
                :pickup_date > r.return_date OR :return_date < r.pickup_date
            )
        )
        AND c.status !='out of service'; 
    ";

    $stmt = $db->prepare($query);
    $stmt->execute([
        ':office_id' => $office_id,
        ':pickup_date' => $pickup_date,
        ':return_date' => $return_date,
    ]);

    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Respond with the available cars
    echo json_encode($cars);
} catch (Exception $e) {
    // Log the error message for debugging
    file_put_contents('error.log', $e->getMessage() . PHP_EOL, FILE_APPEND);

    // Respond with error
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
