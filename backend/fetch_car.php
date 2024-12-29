<?php
// Enable CORS for all responses
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Database connection
    $db = new PDO("mysql:host=localhost;dbname=carrental", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Fetch cars
        $query = "SELECT * FROM car";
        $stmt = $db->query($query);
        $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['status' => 'success', 'data' => $cars]);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Update car status
        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['car_id'], $input['status'])) {
            throw new Exception('Invalid input: car_id and status are required');
        }

        $query = "UPDATE car SET status = :status WHERE car_id = :car_id";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':status' => $input['status'],
            ':car_id' => $input['car_id'],
        ]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Car status updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No rows updated.']);
        }
    } else {
        throw new Exception('Unsupported request method');
    }
} catch (Exception $e) {
    // Log the error message for debugging
    file_put_contents('error.log', $e->getMessage() . PHP_EOL, FILE_APPEND);

    // Respond with error
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
