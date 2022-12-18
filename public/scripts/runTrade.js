var outframe;
var progressframe;
var output;
var worker = null;

function processmessage(e) {
  switch (e.data[0]) {
    case OUTPUT:
      output += e.data[1] + (e.data[2] ? '\n' : '');
      outframe.innerHTML += e.data[1] + (e.data[2] ? '<br>' : '');
      outframe.scrollTop = outframe.scrollHeight;
      break;

    case ERROR:
      alert(e.data[1]);
      break;

    case PROGRESS:
      let bar =
        '<progress value=' + e.data[1] + ' max=' + e.data[2] + '></progress>';
      let text =
        e.data[1] +
        ' of ' +
        e.data[2] +
        ', ' +
        e.data[3] +
        ', trades: ' +
        e.data[4];
      progressframe.innerHTML = bar + '<br>' + text;
      break;

    case DONE:
      break;
  }
}

function doit() {
  let url = '/api/wantlist';
  outframe = document.getElementById('output');
  progressframe = document.getElementById('progress');
  runnow = document.getElementById('runnow');

  try {
    outframe.innerHTML = 'Running... \n\n';
    output = '';

    if (worker != null) worker.terminate();

    worker = new Worker('/scripts/trademax-worker.js');
    worker.onmessage = processmessage;
    worker.postMessage([RUN, url]);
  } catch (error) {
    outframe.innerHTML =
      'There was an error. Please try to go to step 5 first, then return to this page.';
  }
}

function copytoclipboard(id) {
  let output = document.getElementById(id);
  window.navigator.clipboard
    .writeText(output.textContent)
    .then(() => alert('Text copied to clipboard'))
    .catch((err) => {
      alert('Error in copying text: ', err);
    });
}

function geturlparmeter(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function setup() {
  var listid = geturlparmeter('listid');
  var url = geturlparmeter('url');

  var listidobj = document.getElementById('listid');
  var urlobj = document.getElementById('url');

  if (listid) listidobj.value = listid;
  if (url) urlobj.value = url;
}
