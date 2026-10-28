# TS-SPACES — PHP

The converted website runs on PHP with plain browser JavaScript. It preserves the original content, stylesheet, icons, photographs, responsive layouts, page URLs, mobile navigation, FAQs and enquiry flow. Node.js and Next.js are not needed to run the PHP website.

## Run locally

Requires PHP 8.1+; enable cURL for enquiry delivery.

```sh
php -S localhost:3000 -t public router.php
```

Open http://localhost:3000. Copy config.example.php to config.local.php for optional configuration, or set the same keys as server environment variables. Environment values take precedence.

- NEXT_PUBLIC_SITE_URL: public origin without a trailing slash, for metadata, sitemap and allowed form origin.
- INQUIRY_WEBHOOK_URL: HTTPS JSON endpoint returning 2xx after accepting an enquiry. Leave empty to retain the disabled form and 503 API response.
- INQUIRY_WEBHOOK_TOKEN: optional server-side bearer token.
- NEXT_PUBLIC_MAP_EMBED_URL: optional approved map embed URL.

## Hosting

For cPanel, upload **dist/TS-SPACES-cPanel.zip** into your domain's public_html directory and extract it there. The ZIP includes the correct layout and hidden Apache rules, with no Node dependencies. Follow CPANEL-SETUP.txt. Your domain and HTTPS are detected automatically. Rebuild the ZIP after source changes using `powershell -ExecutionPolicy Bypass -File scripts/package-cpanel.ps1`.

Point your PHP host's document root at **public/**. Apache needs mod_rewrite and permission to use the included .htaccess. Keep php/ and config.local.php alongside public/, outside the document root. On Nginx, use `try_files $uri /index.php?$query_string;` with your standard PHP-FPM configuration based on the public document root.

Original URLs such as /about, /services, /contact, /api/inquiry, /robots.txt and /sitemap.xml are handled by public/index.php. Unknown URLs return the original 404 design and HTTP 404.

## Source files

- php/pages/: page content and metadata.
- php/header.php and php/footer.php: shared navigation and footer.
- public/assets/site.css: original compiled stylesheet; no build required.
- public/assets/site.js: mobile menu and enquiry interactions.
- php/bootstrap.php and php/inquiry.php: configuration, validation and HTTPS webhook delivery.
- public/images/, public/logo-mark.svg and public/assets/icon.svg: original images and branding.

The original Next.js source remains as a reference and is not used by PHP. Its documentation, image credits and business confirmation notes are in README.nextjs.md. The existing Vercel configuration targets that original application; deploy the converted site to a PHP-capable host.

## Verification

The comparison script checks all eight pages at seven viewport widths, text, heading positions, links, images, mobile menu, FAQs, workspace prefill, enquiry validation, 404, sitemap and robots. It uses the existing Playwright development dependency and installed Chrome.

```sh
# Terminal 1: original reference
npm run dev
# Terminal 2: converted PHP site
php -S 127.0.0.1:8080 -t public router.php
# Terminal 3: comparison
node scripts/verify-php.mjs
```

Real enquiry receipt requires your webhook configuration.

Verification completed: all PHP files passed syntax checks; all 56 page/viewport comparisons passed with matching text, links and heading positions. Navigation, image loading, FAQs, prefill, API validation, missing delivery configuration, 404, sitemap and robots passed. The enabled form was also checked for client validation, delivery failure, mocked acceptance and reset using scripts/verify-php-form.mjs. Real webhook receipt was not tested.
