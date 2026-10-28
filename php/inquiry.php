<?php
declare(strict_types=1);
function reply(int $status, array $body): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, ['message' => 'Method not allowed.']);
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$requestOrigin = $scheme . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
if ($origin !== '' && $origin !== $requestOrigin && $origin !== $siteUrl) reply(403, ['message' => 'Request origin is not allowed.']);
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) reply(413, ['message' => 'Request is too large.']);
$text = file_get_contents('php://input', false, null, 0, 16385);
if (strlen($text) > 16384) reply(413, ['message' => 'Request is too large.']);
$raw = json_decode($text, true);
if (json_last_error() !== JSON_ERROR_NONE) reply(400, ['message' => 'Invalid request.']);
[$data, $errors] = validateInquiry($raw);
if ($errors) reply(400, ['message' => 'Please check the form.', 'errors' => $errors]);
if ($data['website'] !== '') reply(400, ['message' => 'Unable to accept this enquiry.']);
$endpoint = setting('INQUIRY_WEBHOOK_URL');
if (!$endpoint) reply(503, ['message' => 'Enquiry delivery is not configured yet. No enquiry has been sent.']);
try {
    if (parse_url($endpoint, PHP_URL_SCHEME) !== 'https' || !function_exists('curl_init')) throw new RuntimeException('Delivery unavailable');
    $headers = ['Content-Type: application/json'];
    if (setting('INQUIRY_WEBHOOK_TOKEN') !== '') $headers[] = 'Authorization: Bearer ' . setting('INQUIRY_WEBHOOK_TOKEN');
    $data['source'] = 'TS-SPACES website';
    $data['submittedAt'] = gmdate('Y-m-d\TH:i:s') . '.000Z';
    $curl = curl_init($endpoint);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => json_encode($data, JSON_UNESCAPED_UNICODE),
        CURLOPT_TIMEOUT => 10,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_WRITEFUNCTION => static function ($handle, string $chunk): int { return strlen($chunk); },
    ]);
    $result = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    if ($result === false || $status < 200 || $status >= 300) throw new RuntimeException('Delivery rejected');
    reply(200, ['message' => 'Enquiry delivered.']);
} catch (Throwable $error) {
    reply(502, ['message' => 'Your enquiry could not be delivered. Please try again later.']);
}
