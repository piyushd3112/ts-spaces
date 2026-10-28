<?php
// Router for the PHP development server, with public/ as document root.
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/');
$public = realpath($_SERVER['DOCUMENT_ROOT'] ?? (__DIR__ . '/public'));
$file = realpath($public . $path);
if ($path !== '/' && $file !== false && strpos($file, $public . DIRECTORY_SEPARATOR) === 0 && is_file($file)) return false;
require $public . '/index.php';
