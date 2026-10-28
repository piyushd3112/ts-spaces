<?php
declare(strict_types=1);

// Server environment takes precedence over the optional local configuration.
$configFile = dirname(__DIR__) . '/config.local.php';
$config = is_file($configFile) ? require $configFile : [];
function setting(string $name, string $default = ''): string {
    global $config;
    $value = getenv($name);
    return $value !== false ? $value : ($config[$name] ?? $default);
}
$host = $_SERVER['HTTP_HOST'] ?? 'localhost:3000';
if (!preg_match('/^[a-zA-Z0-9.\-]+(?::[0-9]+)?$/D', $host)) $host = 'localhost:3000';
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$siteUrl = rtrim(setting('NEXT_PUBLIC_SITE_URL') ?: $scheme . '://' . $host, '/');
$inquiryEnabled = setting('INQUIRY_WEBHOOK_URL') !== '';

function validateInquiry($raw): array {
    $data = [];
    foreach (['name', 'email', 'phone', 'workspace', 'date', 'message', 'website'] as $key) {
        $data[$key] = is_array($raw) && is_string($raw[$key] ?? null) ? trim($raw[$key]) : '';
    }
    $errors = [];
    $length = static function (string $value): int {
        return preg_match_all('/./us', $value) + preg_match_all('/[\x{10000}-\x{10FFFF}]/u', $value);
    };
    if ($length($data['name']) < 2 || $length($data['name']) > 100) $errors['name'] = 'Enter your name (2–100 characters).';
    if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/u', $data['email']) || $length($data['email']) > 254) $errors['email'] = 'Enter a valid email address.';
    if (!preg_match('/^[+\d\s()-]{7,25}$/', $data['phone']) || strlen(preg_replace('/\D/', '', $data['phone'])) < 7) $errors['phone'] = 'Enter a valid phone number.';
    if (!in_array($data['workspace'], ['Coworking Space', 'Dedicated Desk', 'Individual Seating', 'Conference Room', 'Startup Workspace', 'Other'], true)) $errors['workspace'] = 'Choose a workspace requirement.';
    if ($data['date'] !== '') {
        $date = DateTimeImmutable::createFromFormat('!Y-m-d', $data['date'], new DateTimeZone('Asia/Kolkata'));
        $today = new DateTimeImmutable('today', new DateTimeZone('Asia/Kolkata'));
        if (!$date || $date->format('Y-m-d') !== $data['date'] || $date < $today) $errors['date'] = 'Choose today or a future visit date.';
    }
    if ($length($data['message']) > 3000) $errors['message'] = 'Keep your message within 3,000 characters.';
    return [$data, $errors];
}
