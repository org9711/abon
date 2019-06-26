addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
}

function getHeader() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayHeader;
  q.open("GET", '/frame/get_header', true);
  q.send();
}

function displayHeader() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let header = document.getElementsByTagName("header")[0];
  header.innerHTML = this.responseText;
  // pageHeading = document.getElementById("homeHeader");
  // pageHeading.className = "active-tab"
}

function getFooter() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayFooter;
  q.open("GET", '/frame/get_footer', true);
  q.send();
}

function displayFooter() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = this.responseText;
}
