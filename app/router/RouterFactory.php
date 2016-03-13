<?php
namespace App;

use Nette\Application\Routers\RouteList,
    Nette\Application\Routers\Route;

class RouterFactory {
  /**
   * @return \Nette\Application\IRouter
   */
  public function createRouter() {
    $router = new RouteList();
    $router[] = new Route('<action>', 'Default:default');
    return $router;
  }
}