addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
}

function getHeader() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayHeader;
  q.open("GET", '/frame/get_header', true);
  q.send();
}

function displayHeader() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var header = document.querySelector("#header");
  header.innerHTML = this.responseText;
}

function getFooter() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayFooter;
  q.open("GET", '/frame/get_footer', true);
  q.send();
}

function displayFooter() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var footer = document.querySelector("#footer");
  footer.innerHTML = this.responseText;
}
