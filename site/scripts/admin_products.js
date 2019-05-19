addEventListener('load', start);

function start() {
  getProducts();
  getProductsForm();
}

function displayProducts() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  let products = JSON.parse(this.responseText);
  let ul = document.querySelector("#currentProducts");
  for (var i = 0; i < products.length; i++) {
    let product = document.createElement('div');
    var name = document.createElement('h3');
    var price = document.createElement('p');
    var image = document.createElement('img');

    name.textContent = products[i].name;
    price.textContent = products[i].price;
    image.src = products[i].image_name;

    product.appendChild(name);
    product.appendChild(price);
    product.appendChild(image);

    ul.appendChild(product);
  }
}

function getProducts() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayProducts;
  q.open("GET", '/products/get_products', true);
  q.send();
}

function getProductsForm() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayProductForm;
  q.open("GET", '/products/get_product_form', true);
  q.send();
}

function displayProductForm() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  var testimonialForm = document.querySelector("#productForm");
  testimonialForm.innerHTML = this.responseText;
  document.querySelector("#submitProduct").addEventListener("click", postProduct);
}

function postProduct() {
  productObj = {
    name: document.querySelector('input[name="name"]').value,
    price: document.querySelector('input[name="price"]').value,
    image_name: document.querySelector('input[name="image_name"]').value
  };
  product = JSON.stringify(productObj);
  var q = new XMLHttpRequest();
  q.onreadystatechange = displayOneMoreProduct;
  q.open("POST", '/products/submit_product', true);
  q.send(product);
}

function displayOneMoreProduct() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  let productRec = JSON.parse(this.responseText);

  let ul = document.querySelector("#currentProducts");
  let product = document.createElement('div');
  var name = document.createElement('h3');
  var price = document.createElement('p');
  var image = document.createElement('img');

  name.textContent = productRec[0].name;
  price.textContent = productRec[0].price;
  image.src = productRec[0].image_name;

  product.appendChild(name);
  product.appendChild(price);
  product.appendChild(image);

  ul.appendChild(product);

  getProductsForm();
}
