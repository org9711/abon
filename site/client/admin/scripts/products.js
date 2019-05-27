addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getProductLayout();
}

let productLayout;
let imagesList;

function getProductLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeProductLayout;
  q.open("GET", 'admin/products/get_row_layout', true);
  q.send();
}

function storeProductLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  productLayout = el;
  getImagesList();
}

function getImagesList() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeImagesLayout;
  q.open("GET", 'admin/get_images_list', true);
  q.send();
}

function storeImagesLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  imagesList = JSON.parse(this.responseText);
  getProducts();
  addProduct();
}

function getProducts() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayProducts;
  q.open("GET", 'admin/products/get_products', true);
  q.send();
}

function displayProducts() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  products = JSON.parse(this.responseText);
  for (let i = 0; i < products.length; i++) {
    appendProductToTable(products[i]);
  }
}

function appendProductToTable(product) {
  let ul = document.querySelector("#table-inside");
  let productTag = productLayout.cloneNode(true);

  let productIdTag = productTag.getElementsByClassName('pt-3-half product-id')[0];
  let productNameTag = productTag.getElementsByClassName('pt-3-half product-name')[0];
  let productPriceTag = productTag.getElementsByClassName('pt-3-half product-price')[0];
  let productImageTag = productTag.getElementsByClassName('form-control image-options')[0];
  let productStatusTag = productTag.getElementsByClassName('form-control product-status')[0];
  let productDescriptionTag = productTag.getElementsByClassName('pt-3-half product-description')[0];
  let confirmButton = productTag.getElementsByClassName('btn btn-success btn-rounded confirmBtn btn-sm my-0')[0];
  let removeButton = productTag.getElementsByClassName('btn btn-danger btn-rounded removeBtn btn-sm my-0')[0];

  let productId = product.id;
  let productName = product.name;
  let productPrice = product.price;
  let productImageName = product.image_name;
  let productStatus = product.status;
  let productDescription = product.description;

  let preselectedOption = productStatusTag.getElementsByClassName('product-status-' + productStatus)[0];
  preselectedOption.selected = true;
  for (let i = 0; i < imagesList.length; i++) {
    let option = document.createElement("option");
    option.innerText = imagesList[i];
    if (productImageName == imagesList[i]) option.selected = true;
    productImageTag.append(option);
  }

  productIdTag.innerText = productId;
  productNameTag.innerText = productName;
  productPriceTag.innerText = '£' + parseFloat(productPrice).toFixed(2);
  productDescriptionTag.innerText = productDescription;

  confirmButton.addEventListener("click", function() {
    let price = parseFloat(productPriceTag.innerText.substring(1,5));
    let statusTag = findSelectedOption(productStatusTag);
    let imageNameTag = findSelectedOption(productImageTag);
    let productObj = {
      id: productId,
      name: productNameTag.innerText,
      price: price,
      imageName: imageNameTag.innerText,
      status: statusEncoding(statusTag.innerText),
      description: productDescriptionTag.innerText
    };
    let q = new XMLHttpRequest();
    q.open("POST", 'admin/products/update_product', true);
    q.send(JSON.stringify(productObj));
  });

  product = productTag.firstElementChild;

  removeButton.addEventListener("click", function() {
    ul.removeChild(product);
    let productObj = {
      id: productId
    };
    let q = new XMLHttpRequest();
    q.open("POST", 'admin/products/remove_product', true);
    q.send(JSON.stringify(productObj));
  });

  ul.append(product);
}

function findSelectedOption(selector) {
  for (let i = 0; i < selector.children.length; i++) {
    if (selector.children[i].selected) {
      return selector.children[i];
    }
  }
}

function addProduct() {
  let ul = document.querySelector("#table");
  let addButton = document.getElementsByClassName("btn btn-success btn-rounded btn-sm ml-auto")[0];
  addButton.addEventListener("click", function() {
    let productObj = {
      name: 'Coming Soon',
      price: 2.2,
      imageName: 'pesto.png',
      status: 2,
      description: 'coming soon'
    };
    let q = new XMLHttpRequest();
    q.onreadystatechange = showNewProduct;
    q.open("POST", 'admin/products/add_product', true);
    q.send(JSON.stringify(productObj));
  });
}

function statusEncoding(status) {
  switch (status) {
    case 'Available':
      return 2;
    case 'Sold Out':
      return 1;
    case 'Coming Soon':
      return 0;
  }
}

function showNewProduct() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  product = JSON.parse(this.responseText);
  appendProductToTable(product[0]);
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
  pageHeading = header.getElementsByClassName("productsHeader")[0];
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
