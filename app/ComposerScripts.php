<?php

use Incenteev\ParameterHandler\ScriptHandler as IncenteevScriptHandler;
use Composer\Script\CommandEvent;

class ComposerScripts
{
    public static function postInstall(CommandEvent $event)
    {

        chmod(__DIR__ .'/cache', 0777);
        chmod(__DIR__ .'/logs', 0777);
        chmod(__DIR__ .'/console', 0500);

        IncenteevScriptHandler::buildParameters($event);
    }

    public static function postUpdate(CommandEvent $event)
    {
        self::postInstall($event);
    }
}
