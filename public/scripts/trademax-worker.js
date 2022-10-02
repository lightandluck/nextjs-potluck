importScripts('./trademax.js');
importScripts('./trademax-util.js');

//var tm = new TradeMaximizer();
var xhttp;
var url;
var input;
var lineno;
var tm;

function getaline() {
  if (lineno >= input.length) return null;

  return input[lineno++];
}

function outputaline(line, nl) {
  postMessage([OUTPUT, line, nl]);
}

function progress(iteration, maxiteration, metric, tradeCount) {
  postMessage([PROGRESS, iteration, maxiteration, metric, tradeCount]);
}

function fatal(error) {
  postMessage([ERROR, error]);
  close();
}

function gotthewants() {
  if (xhttp.readyState == 4)
    if (xhttp.status == 200) {
      input = xhttp.responseText.split(/\n/g);
      lineno = 0;

      tm = new TradeMaximizer();
      tm.run(getaline, outputaline, progress, fatal);

      postMessage([DONE]);
    } else {
      let text = MapStatus[xhttp.status];
      if (text != null) text += ' (' + xhttp.status + ')';
      else text = xhttp.status;
      postMessage([ERROR, "Can't retreive " + url + ', ' + text]);
    }
}

onerror = function (error) {
  //postMessage([ERROR, error.message + ", " + error.filename + ":" + error.lineno]);
  postMessage([ERROR, error]);
};

onmessage = function (e) {
  switch (e.data[0]) {
    case RUN:
      url = e.data[1];

      xhttp = getXMLHttpRequest();
      xhttp.onreadystatechange = gotthewants;
      xhttp.open('GET', url, true);
      xhttp.send();
      break;

    case ABORT:
      break;
  }
};
