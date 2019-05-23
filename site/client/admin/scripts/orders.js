addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getOrderLayout();
}

let orderLayout;

function getOrderLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeOrderLayout;
  q.open("GET", 'admin/orders/get_row_layout', true);
  q.send();
}

function storeOrderLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  orderLayout = el;
}

function getHeader() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayHeader;
  q.open("GET", '/admin/frame/get_header', true);
  q.send();
}

function displayHeader() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let header = document.getElementsByTagName("header")[0];
  header.innerHTML = this.responseText;
  pageHeading = header.getElementsByClassName("ordersHeader")[0];
  pageHeading.className = "abon-yellow"
}

function getFooter() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayFooter;
  q.open("GET", '/admin/frame/get_footer', true);
  q.send();
}

function displayFooter() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = this.responseText;
}
