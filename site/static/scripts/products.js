addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getProductLayout();
}

let productLayout;
let descriptionLayout;
let basketRowLayout;

function getProductLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeProductLayout;
  q.open("GET", '/products/get_product_layout', true);
  q.send();
}

function storeProductLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  productLayout = el;
  getBasketRowLayout();
}

function getBasketRowLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeBasketRowLayout;
  q.open("GET", '/products/get_basket_row_layout', true);
  q.send();
}

function storeBasketRowLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  basketRowLayout = el;
  getDescriptionLayout();
}

function getDescriptionLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeDescriptionLayout;
  q.open("GET", '/products/get_description_layout', true);
  q.send();
}

function storeDescriptionLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  descriptionLayout = el;
  getProducts();
}

function getProducts() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayProducts;
  q.open("GET", '/products/get_products', true);
  q.send();
}

function displayProducts() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  products = JSON.parse(this.responseText);
  let ul = document.querySelector("#product-list");

  for (let i = 0; i < products.length; i++) {
    let product = productLayout.cloneNode(true);
    let description = descriptionLayout.cloneNode(true);

    let buttonDiv = product.getElementsByClassName('mask proudct-content')[0]; //product spelt wrong here
    let productNameTag = product.getElementsByTagName('h1')[0];
    let imageTag = product.getElementsByClassName('product-image')[0];
    let infoButtonTag = product.getElementsByClassName('mt-1 btn btn-lg abon-bg-orange')[0];
    let basketButtonTag = document.createElement("button");

    let modalNameTag = description.getElementsByClassName('modal-title')[0];
    let modalDescriptionTag = description.getElementsByClassName('product-description')[0];
    let modalPriceTag = description.getElementsByClassName('product-price')[0];
    let modalDivTag = description.getElementsByClassName('modal fade')[0];

    let productId = products[i].id;
    let productName = products[i].name;
    let productPrice = products[i].price;
    let productImageName = products[i].image_name;
    let productStatus = products[i].status;
    let productDescription = products[i].description;

    let cartTag = document.getElementById("cart");

    if (productStatus == 2) {
      productNameTag.textContent = productName;

      basketButtonTag.innerHTML = 'Add to Basket <i class="fa fa-shopping-basket"></i>';
      basketButtonTag.className = "mt-1 btn btn-lg abon-bg-orange";
      basketButtonTag.addEventListener("click", function() {
        addToBasket(cartTag, productId, productName, productPrice);
      });
      buttonDiv.append(basketButtonTag);
    }
    else if (productStatus == 1) {
        productNameTag.textContent = 'Sold Out';
    }
    else if (productStatus == 0) {
        productNameTag.textContent = 'Coming Soon';
    }

    imageTag.src = productImageName;
    infoButtonTag.dataset.target = '#productId' + productId;

    modalNameTag.textContent = productName;
    modalDescriptionTag.textContent = productDescription;
    modalDivTag.id = 'productId' + productId;
    modalPriceTag.textContent = 'Price: £' + productPrice.toFixed(2) + ' (each sachet serves one person)';

    product = product.firstElementChild;
    productDescription = productDescription.firstElementChild;
    ul.appendChild(product);
    ul.append(description);
  }
}

function addToBasket(cartTag, productId, productName, productPrice) {
  let cartTotalTag = document.getElementById("total");
  let productPriceFloat = parseFloat(productPrice);
  console.log(cartTotalTag.innerText);
  console.log(productPriceFloat)
  addToTotal(cartTotalTag, productPriceFloat);

  let rowId = "row-id-" + productId.toString();
  let basketRow = cartTag.getElementsByClassName(rowId)[0];

  if (basketRow == null) {
    let basketRow = basketRowLayout.cloneNode(true);

    let basketRowTag = basketRow.getElementsByClassName("basketRowId")[0];
    let basketRowNameTag = basketRow.getElementsByClassName("basket-row-product-name")[0];
    let basketRowPriceTag = basketRow.getElementsByClassName("basket-row-product-price")[0];

    basketRowTag.className = rowId;
    basketRowNameTag.innerText = productName;
    basketRowPriceTag.innerText = productPrice.toFixed(2);

    let plusButton = basketRow.getElementsByClassName("bg-light btn btn-increment btn-outline-secondary")[0];
    let minusButton = basketRow.getElementsByClassName("bg-light btn btn-decrement btn-outline-secondary")[0];

    plusButton.addEventListener("click", function() {
      addToTotal(cartTotalTag, productPriceFloat);
    });
    minusButton.addEventListener("click", function() {
      takeFromTotal(cartTotalTag, productPriceFloat);
    })

    basketRow.getElementsByClassName("removeBtn")[0].addEventListener("click", function() {
      let basketRowQuantity = basketRow.getElementsByClassName('form-control text-center')[0];
      currentPrice = parseFloat(cartTotalTag.innerText);
      newPrice = currentPrice - (productPriceFloat * parseInt(basketRowQuantity.value))
      cartTotalTag.innerText = newPrice.toFixed(2);
      this.parentElement.parentElement.remove();
    });

    basketRow = basketRow.firstElementChild;
    cartTag.append(basketRow);
  }
  else {
    let basketRowQuantity = basketRow.getElementsByClassName('form-control text-center')[0];
    basketRowQuantity.value = parseInt(basketRowQuantity.value) + 1;
  }
}

function addToTotal(cartTotalTag, productPriceFloat) {
  currentPrice = parseFloat(cartTotalTag.innerText);
  totalPrice = currentPrice + productPriceFloat;
  cartTotalTag.innerText = totalPrice.toFixed(2);
}

function takeFromTotal(cartTotalTag, productPriceFloat) {
  currentPrice = parseFloat(cartTotalTag.innerText);
  totalPrice = currentPrice - productPriceFloat;
  cartTotalTag.innerText = totalPrice.toFixed(2);
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
  pageHeading = header.getElementsByClassName("productsHeader")[0];
  pageHeading.className = "abon-yellow"
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

function kwalidation(){
    console.log("git here");
}
