<?php
// Allow only the frontend origin
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Enable credentials

// Handle OPTIONS (preflight) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_GET['action'] === 'login') {
    // Get input data
    $data = json_decode(file_get_contents("php://input"), true);
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');
    $role = trim($data['role'] ?? '');

    // Debug incoming data
    file_put_contents('debug_log.txt', "Incoming Data: " . print_r($data, true) . "\n", FILE_APPEND);

    // Validate input
    if (empty($email) || empty($password) || empty($role)) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    // Database connection
    $servername = "localhost";
    $username = "root";
    $passwordDb = "";
    $dbname = "carrental";

    $conn = new mysqli($servername, $username, $passwordDb, $dbname);

    if ($conn->connect_error) {
        echo json_encode(["status" => "error", "message" => "Database connection failed"]);
        exit;
    }

    // Determine the correct table and field
    $table = ($role === 'admin') ? 'admin' : 'customer';
    $field = ($role === 'admin') ? 'username' : 'email';

    // Query the database
    $stmt = $conn->prepare("SELECT * FROM $table WHERE $field = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Debug log
        file_put_contents('debug_log.txt', "User Found: " . print_r($user, true) . "\n", FILE_APPEND);

        // Check password
        if (password_verify($password, $user['password'])) {
            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "name" => $user['name'] ?? $user['username'],
                "role" => $role,
            ]);
        } else {
            // Debug incorrect password
            file_put_contents('debug_log.txt', "Password Mismatch: Input Password: $password | DB Password: " . $user['password'] . "\n", FILE_APPEND);
            echo json_encode(["status" => "error", "message" => "Invalid password"]);
        }
    } else {
        // Debug user not found
        file_put_contents('debug_log.txt', "User Not Found for $field: $email\n", FILE_APPEND);
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }

    $stmt->close();
    $conn->close();
}
?>
