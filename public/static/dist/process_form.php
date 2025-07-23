<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Проверка reCAPTCHA
        $secret_key = '6LdNyxkrAAAAAGczyKCViEQ3gXoEGo0wjPgMM2ez'; // Замените на ваш ключ
        $token = $_POST['recaptcha_token'] ?? '';
        
        $url = "https://www.google.com/recaptcha/api/siteverify?secret=$secret_key&response=$token";
        $response = file_get_contents($url);
        $responseData = json_decode($response);
        
        if (!$responseData || !$responseData->success) {
            throw new Exception('CAPTCHA verification failed');
        }
        
        // Обработка данных формы
        $name = htmlspecialchars($_POST['name'] ?? '');
        $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
        
        if (empty($name) || empty($email)) {
            throw new Exception('Please fill all required fields');
        }
        
        // Отправка email (ваш код)
        $address = "plyasunov.anton@gmail.com";
        $mes = "New request\n\nName: $name\nEmail: $email";
        $sub = 'Request from Site';
        $from_email = 'from@' . $_SERVER['HTTP_HOST'];
        
        if (!mail($address, $sub, $mes, "Content-type:text/plain; charset = utf-8\r\nFrom:$from_email")) {
            throw new Exception('Failed to send email');
        }
        
        echo json_encode(['status' => 'success']);
        exit;
        
    } catch (Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
        exit;
    }
}

echo json_encode([
    'status' => 'error',
    'message' => 'Invalid request method'
]);
exit;
?>