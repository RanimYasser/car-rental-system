<?php
// Allow only the frontend origin
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "carrental"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Parse the request
$action = $_GET['action'] ?? null; // Action for the report
$params = json_decode(file_get_contents("php://input"), true); // Parameters for the report

if (!$action) {
    echo json_encode(["status" => "error", "message" => "No action specified"]);
    exit;
}

// Handle different API actions
switch ($action) {
    case 'reservation_report':
        getReservationReport($conn, $params);
        break;

    case 'car_reservation_report':
        getCarReservationReport($conn, $params);
        break;

    case 'car_status':
        getCarStatus($conn, $params);
        break;

    case 'customer_reservations':
        getCustomerReservations($conn, $params);
        break;

    case 'daily_payments':
        getDailyPayments($conn, $params);
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
        break;
}

$conn->close();

function getReservationReport($conn, $params) {
    $pickup_date = $params['pickup_date'] ?? null;
    $return_date = $params['return_date'] ?? null;

    $sql = "SELECT r.*, c.name, c.phone, car.model, car.plate_id 
            FROM Reservation r
            JOIN Customer c ON r.license_number = c.license_number
            JOIN Car car ON r.car_id = car.car_id
            WHERE 1=1";
    if ($pickup_date) {
        $sql .= " AND r.pickup_date >= '$pickup_date'";
    }
    if ($return_date) {
        $sql .= " AND r.return_date <= '$return_date'";
    }

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "success", "data" => $result->fetch_all(MYSQLI_ASSOC)]);
    } else {
        echo json_encode(["status" => "success", "data" => []]);
    }
}

function getCarReservationReport($conn, $params) {
    $car_id = $params['car_id'] ?? null;
    $pickup_date = $params['pickup_date'] ?? null;
    $return_date = $params['return_date'] ?? null;

    $sql = "SELECT r.*, car.*, c.name, c.phone 
            FROM Reservation r
            JOIN Car car ON r.car_id = car.car_id
            JOIN Customer c ON r.license_number = c.license_number
            WHERE 1=1";
    if ($car_id) {
        $sql .= " AND car.car_id = '$car_id'";
    }
    if ($pickup_date) {
        $sql .= " AND r.pickup_date >= '$pickup_date'";
    }
    if ($return_date) {
        $sql .= " AND r.return_date <= '$return_date'";
    }

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "success", "data" => $result->fetch_all(MYSQLI_ASSOC)]);
    } else {
        echo json_encode(["status" => "success", "data" => []]);
    }
}

function getCarStatus($conn, $params) {
    $specific_date = $params['specific_date'] ?? null;

    $sql = "SELECT car.*, 
                   CASE 
                       WHEN r.pickup_date <= '$specific_date' AND r.return_date >= '$specific_date' THEN 'rented' 
                       ELSE car.status 
                   END AS status_on_date
            FROM Car car
            LEFT JOIN Reservation r ON car.car_id = r.car_id
            WHERE ('$specific_date' IS NULL OR ('$specific_date' BETWEEN r.pickup_date AND r.return_date))";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "success", "data" => $result->fetch_all(MYSQLI_ASSOC)]);
    } else {
        echo json_encode(["status" => "success", "data" => []]);
    }
}

function getCustomerReservations($conn, $params) {
    $license_number = $params['license_number'] ?? null;

    $sql = "SELECT r.*, car.model, car.plate_id, c.name, c.phone 
            FROM Reservation r
            JOIN Customer c ON r.license_number = c.license_number
            JOIN Car car ON r.car_id = car.car_id
            WHERE c.license_number = '$license_number'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "success", "data" => $result->fetch_all(MYSQLI_ASSOC)]);
    } else {
        echo json_encode(["status" => "success", "data" => []]);
    }
}

function getDailyPayments($conn, $params) {
    $start_date = $params['start_date'] ?? null;
    $end_date = $params['end_date'] ?? null;

    $sql = "SELECT DATE(r.pickup_date) AS date, SUM(r.payment_amount) AS daily_payment
            FROM Reservation r
            WHERE 1=1";
    if ($start_date) {
        $sql .= " AND r.pickup_date >= '$start_date'";
    }
    if ($end_date) {
        $sql .= " AND r.return_date <= '$end_date'";
    }
    $sql .= " GROUP BY DATE(r.pickup_date)";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "success", "data" => $result->fetch_all(MYSQLI_ASSOC)]);
    } else {
        echo json_encode(["status" => "success", "data" => []]);
    }
}
?>
