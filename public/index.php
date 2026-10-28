<?php
declare(strict_types=1);
$phpRoot = is_dir(__DIR__ . '/php') ? __DIR__ . '/php' : dirname(__DIR__) . '/php';
require $phpRoot . '/bootstrap.php';
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/');
$path = rtrim($path, '/') ?: '/';
if ($path === '/index.php') $path = '/';
if ($path === '/api/inquiry') require $phpRoot . '/inquiry.php';
$routes = ['/' => 'home', '/about' => 'about', '/services' => 'services', '/facilities' => 'facilities', '/faq' => 'faq', '/contact' => 'contact', '/privacy' => 'privacy', '/terms' => 'terms'];
if ($path === '/robots.txt') {
    header('Content-Type: text/plain; charset=utf-8');
    echo "User-Agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: $siteUrl/sitemap.xml\n";
    exit;
}
if ($path === '/sitemap.xml') {
    header('Content-Type: application/xml; charset=utf-8');
    echo '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    foreach ($routes as $route => $unused) {
        echo '<url><loc>' . htmlspecialchars($siteUrl . ($route === '/' ? '' : $route), ENT_XML1, 'UTF-8') . '</loc><changefreq>monthly</changefreq><priority>' . ($route === '/' ? '1' : '0.7') . '</priority></url>';
    }
    echo '</urlset>';
    exit;
}
$page = $routes[$path] ?? '404';
if ($page === '404') http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php require $phpRoot . '/pages/' . $page . '.head.php'; ?>
<link rel="stylesheet" href="/assets/site.css">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<script src="/assets/site.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<?php require $phpRoot . '/header.php'; ?>
<main id="main"><?php
ob_start();
require $phpRoot . '/pages/' . $page . '.php';
$content = ob_get_clean();
$mapUrl = setting('NEXT_PUBLIC_MAP_EMBED_URL');
if ($mapUrl !== '') {
    $content = preg_replace_callback('/(<iframe\b[^>]*\bsrc=")[^"]*(")/i', static function ($matches) use ($mapUrl) {
        return $matches[1] . htmlspecialchars($mapUrl, ENT_QUOTES, 'UTF-8') . $matches[2];
    }, $content);
}
echo $content;
?></main>
<?php require $phpRoot . '/footer.php'; ?>
</body>
</html>
