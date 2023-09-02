<?php
// Set CORS headers to allow requests from your domain
header('Access-Control-Allow-Origin: http://127.0.0.1:5500/');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Get data from form
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$to = 'alaoabdulquayyumm@gmail.com';
$subject = 'Mail From website';

// Validate input
if (!empty($name) && !empty($email) && !empty($message) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $txt = 'Name = ' . $name . "\r\n  Email = " . $email . "\r\n Message = " . $message;
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // Send the email
    if (mail($to, $subject, $txt, $headers)) {
        echo json_encode(["status" => 200, "message" => "Email sent successfully"]);
    } else {
        echo json_encode(["status" => 500, "message" => "Email sending failed"]);
    }
} else {
    echo json_encode(["status" => 400, "message" => "Invalid input data"]);
}
?>
