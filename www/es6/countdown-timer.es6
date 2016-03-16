(function(cid, queryParams) {
  let queryString, Countdowner,
    params, parsedDate, ctimer,
    supportedStyleProperties,
    styles = {};

  document.write('<div id="' + cid + '"></div>');

  queryString = require('query-string');
  Countdowner = require('countdowner/src/countdowner');

  params = queryString.parse(queryParams);
  parsedDate = new Date(Number(params.date));

  if(isNaN(parsedDate.getTime())) {
    throw new Error('Wrong date supplied');
  } else {
    supportedStyleProperties = ['color', 'backgroundColor', 'padding', 'margin']

    for(styleProperty of supportedStyleProperties) {
      if(params[styleProperty]) {
        styles[styleProperty] = params[styleProperty]
      }
    }

    ctimer = new Countdowner(parsedDate);
    ctimer.render(document.getElementById(cid), styles);
  }
})(COUNTDOWNER_ID, QUERY_PARAMS);