addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getProductsLayout();
  getProducts();
}

var productLayout;

function getProductsLayout() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = storeProductsLayout;
  q.open("GET", '/products/get_products_layout', true);
  q.send();
}

function storeProductsLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var el = document.createElement('html');
  el.innerHTML = this.responseText;
  productLayout = el;
}

function getProducts() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayProducts;
  q.open("GET", '/products/get_products', true);
  q.send();
}

function displayProducts() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  let products = JSON.parse(this.responseText);
  console.log(products);
  let ul = document.querySelector("#product-list");
  for (var i = 0; i < products.length; i++) {
      let product = productLayout.cloneNode(true);
      let name = product.getElementsByTagName('h1')[0];
      let image = product.getElementsByClassName('product-image')[0];
      name.textContent = products[i].name;
      image.src = products[i].image_name;
      product = product.firstElementChild;
      console.log(product);
      ul.appendChild(product);
  }
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
