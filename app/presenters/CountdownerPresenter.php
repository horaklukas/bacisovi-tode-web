<?php

//  namespace App;

class CountdownerPresenter extends Nette\Application\UI\Presenter {
  public function actionGet() {
    $queryParamsList = array();
    $queryParams = $this->getParameters();

    foreach ($queryParams as $name => $value) {
      if($name !== 'action') {
        $queryParamsList[] = "$name=$value";
      }
    }

    $this->getHttpResponse()->setHeader('Content-Type', 'application/javascript');

    $content = file_get_contents(WWW_DIR.'/js/countdown-timer.js');

    $uniqueId = uniqid('cdt_');
    $content = str_replace('COUNTDOWNER_ID', "'$uniqueId'", $content);

    $queryParamsStr = implode('&', $queryParamsList);
    $content = str_replace('QUERY_PARAMS', "'$queryParamsStr'", $content);

    $this->template->scriptContent = $content;

  }

  public function renderDefault() {
    $this->template->date24h = (new DateTime())
      ->add(new DateInterval('P1D'))
      ->getTimestamp() * 1000;

    $this->template->date30min = (new DateTime())
      ->add(new DateInterval('PT30M'))
      ->getTimestamp() * 1000;

    $this->template->date5min = (new DateTime())
      ->add(new DateInterval('PT5M'))
      ->getTimestamp() * 1000;
  }
}

?>