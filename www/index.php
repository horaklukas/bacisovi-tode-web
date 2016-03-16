<?php
  if (@!include __DIR__ . '/../vendor/autoload.php') {
    die('Install Nette using `composer update`');
  }

  define('WWW_DIR', __DIR__);
  define('APP_DIR', __DIR__.'/../app');

  $configurator = new Nette\Configurator;

  //$configurator->setDebugMode(TRUE);
  $configurator->enableDebugger(__DIR__ . '/../log');
  $configurator->setTempDirectory(__DIR__ . '/../temp');
  $configurator->addConfig(APP_DIR . '/config/config.neon');
  $configurator->createRobotLoader()
      ->addDirectory(APP_DIR)
      ->addDirectory(__DIR__ . '/../vendor')
      ->register();
  $container = $configurator->createContainer();

  $container->getService('application')->run();
?>