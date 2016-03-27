<?php

//  namespace App;

class DefaultPresenter extends Nette\Application\UI\Presenter {
  public function renderDefault() {
    $this->template->code = '
      (function() {
        var web, pageContent;

        web = createWebsite("bacisovi.tode.cz");

        for(var i = 0; i < contentPages.length; i++) {
          pageContent = contentPages[i];

          developer.addContentPage(function(pageTarget) {
            renderPage(pageTarget, pageContent)
          });
        }

        function renderPage(element, content) {
          if(typeof content !== "string") {
            content = serialize(content);
          }

          element.innerHTML = content;
        }
      })()';
  }
}

?>