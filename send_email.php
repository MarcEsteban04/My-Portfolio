<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$message_content = filter_var(trim($_POST["message"]), FILTER_SANITIZE_FULL_SPECIAL_CHARS);

if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message_content)) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill out all fields correctly.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'marcdelacruzesteban@gmail.com';
    $mail->Password   = 'wtoeuwqhrjbiscjg';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465; 

    $mail->setFrom($email, 'Portfolio Contact Form');
    $mail->addAddress('marcdelacruzesteban@gmail.com', 'Marc Esteban');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'New Message from Portfolio by: ' . $name;
    
    $email_body = "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>New Message from Your Portfolio</title>
    </head>
    <body style='margin: 0; padding: 0; background-color: #f1f5f9; font-family: Inter, Arial, sans-serif; color: #334155;'>
        <table border='0' cellpadding='0' cellspacing='0' width='100%'>
            <tr>
                <td style='padding: 20px 0;'>
                    <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);'>
                        
                        <tr>
                            <td align='center' style='padding: 30px; background: linear-gradient(135deg, #fb923c, #f97316); border-radius: 12px 12px 0 0;'>
                                <h1 style='color: #ffffff; margin: 0; font-size: 28px; font-weight: 800;'>New Message Received</h1>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style='padding: 30px 40px;'>
                                <p style='margin: 0 0 24px; font-size: 16px; color: #475569;'>You've received a new message via your portfolio contact form.</p>
                                <table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;'>
                                    <tr>
                                        <td style='padding: 20px;'>
                                            <p style='margin: 0 0 12px; font-size: 16px;'><strong>From:</strong> {$name}</p>
                                            <p style='margin: 0 0 12px; font-size: 16px;'><strong>Email:</strong> <a href='mailto:{$email}' style='color: #f97316; text-decoration: none; font-weight: 600;'>{$email}</a></p>
                                            <p style='margin: 0 0 8px; font-size: 16px;'><strong>Message:</strong></p>
                                            <p style='margin: 0; line-height: 1.7; font-style: italic; color: #475569;'>\"" . nl2br(htmlspecialchars($message_content)) . "\"</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <tr>
                            <td align='center' style='padding: 30px; background-color: #0A0F1F; color: #94a3b8; border-radius: 0 0 12px 12px; font-size: 14px;'>
                                <p style='margin: 0;'>&copy; " . date('Y') . " Marc Jeillord D.C. Esteban</p>
                                <p style='margin: 10px 0 0;'><a href='#' style='color: #f97316; text-decoration: none;'>Visit Portfolio</a></p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>";

    $mail->Body    = $email_body;
    $mail->AltBody = "You have received a new message.\n\nName: {$name}\nEmail: {$email}\n\nMessage:\n{$message_content}";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Message sent successfully! I will get back to you soon.']);

} catch (Exception $e) {
    error_log('PHPMailer Error: ' . $mail->ErrorInfo);
    echo json_encode(['status' => 'error', 'message' => 'Message could not be sent. Please try again later.']);
}
?>