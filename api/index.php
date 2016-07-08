<?php

header('content-type:application/json;charset=utf-8');

require_once 'jssdk.php';

$config = require_once 'config.php';

$jssdk = new JSSDK($config['app_id'], $config['app_secret']);

$signPackage = $jssdk->GetSignPackage();

echo json_encode([
    'appId' => $signPackage['appId'],
    'timestamp' => $signPackage['timestamp'],
    'nonceStr' => $signPackage['nonceStr'],
    'signature' => $signPackage['signature'],
]);

exit();
