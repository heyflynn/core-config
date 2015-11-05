<?php

// If you don't want to setup permissions the proper way, just uncomment the following PHP line
// read http://symfony.com/doc/current/book/installation.html#configuration-and-setup for more information
//umask(0000);

// This check prevents access to debug front controllers that are deployed by accident to production servers.
// Feel free to remove this, extend it, or make something more sophisticated.
if (isset($_SERVER['HTTP_CLIENT_IP'])
    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    || !in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1', 'fe80::1', '::1'))
) {
    header('HTTP/1.0 403 Forbidden');
    exit('You are not allowed to access this file. Check '.basename(__FILE__).' for more information.');
}

# If you want Silex to trust the X-Forwarded-For* headers from your reverse proxy at address $ip, you will need to whitelist it as documented in
# http://symfony.com/doc/current/components/http_foundation/trusting_proxies.html
// Symfony\Component\HttpFoundation\Request::setTrustedProxies(array('127.0.0.1', '::1'));


require_once __DIR__.'/../app/bootstrap.php';
require_once __DIR__.'/../app/Sifoan.php';

Symfony\Component\Debug\Debug::enable();

$sifoan = new Sifoan(__DIR__ ."/..","dev", true);
$sifoan->run();
