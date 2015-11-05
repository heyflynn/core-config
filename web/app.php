<?php

# If you want Silex to trust the X-Forwarded-For* headers from your reverse proxy at address $ip, you will need to whitelist it as documented in
# http://symfony.com/doc/current/components/http_foundation/trusting_proxies.html
// Symfony\Component\HttpFoundation\Request::setTrustedProxies(array('127.0.0.1', '::1'));

require_once __DIR__.'/../app/bootstrap.php';
require_once __DIR__.'/../app/Sifoan.php';

$sifoan = new Sifoan(__DIR__ ."/..","prod", false);
//$sifoan->run();
$sifoan['http_cache']->run();
