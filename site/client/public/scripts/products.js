addEventListener('load', start);

function start() {
  getHeader();
  getFooter();
  getProductLayout();
}

let productLayout;
let descriptionLayout;
let basketRowLayout;
let modalLayout;

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

    let buttonDiv = product.getElementsByClassName('mask product-content')[0];
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
    ul.append(product);
    ul.append(description);
  }
}

function addToBasket(cartTag, productId, productName, productPrice) {
  let cartTotalTag = document.getElementById("total");
  let productPriceFloat = parseFloat(productPrice);

  let rowId = "row-id-" + productId.toString();
  let basketRow = cartTag.getElementsByClassName(rowId)[0];

  if (basketRow == null) {
    let basketRow = basketRowLayout.cloneNode(true);

    let basketRowTag = basketRow.getElementsByClassName("basketRowId")[0];
    let basketRowNameTag = basketRow.getElementsByClassName("basket-row-product-name")[0];
    let basketRowPriceTag = basketRow.getElementsByClassName("basket-row-product-price")[0];

    basketRowTag.className = rowId;
    basketRowNameTag.innerText = productName;
    basketRowPriceTag.innerText = '£' + productPrice.toFixed(2);

    let plusButton = basketRow.getElementsByClassName("bg-light btn btn-increment btn-outline-secondary")[0];
    let minusButton = basketRow.getElementsByClassName("bg-light btn btn-decrement btn-outline-secondary")[0];

    basketRow.getElementsByClassName("removeBtn")[0].addEventListener("click", function() {
      let basketRowQuantity = basketRow.getElementsByClassName('form-control text-center')[0];
      this.parentElement.parentElement.remove();
      subtotal();
      checkoutToggle();
    });

    plusButton.addEventListener("click", function() {
      let basketRowQuantity = basketRow.getElementsByClassName('form-control text-center')[0];
      let oldQuantity = parseInt(basketRowQuantity.value);
      if (oldQuantity < 9) {
        basketRowQuantity.value = oldQuantity + 1;
        subtotal();
      }
    });
    minusButton.addEventListener("click", function() {
      let basketRowQuantity = basketRow.getElementsByClassName('form-control text-center')[0];
      let oldQuantity = parseInt(basketRowQuantity.value);
      if (oldQuantity > 1) {
        basketRowQuantity.value = oldQuantity - 1;
        subtotal();
      }
    });

    basketRow = basketRow.firstElementChild;
    cartTag.append(basketRow);
  }
  else {
    let basketRowQuantity = basketRow.getElementsByClassName('form-control text-center')[0];
    let oldQuantity = parseInt(basketRowQuantity.value);
    if (oldQuantity < 9) {
      basketRowQuantity.value = parseInt(basketRowQuantity.value) + 1;
    }
  }

  subtotal();
  checkoutToggle();
}

function subtotal() {
  let myCart = document.getElementById("cart");
  let tableRows = myCart.children;
  let sum = 0;

  for(i = 1; i < tableRows.length; i++) {
    let priceString = tableRows[i].getElementsByClassName("pt-3-half basket-row-product-price")[0].innerHTML;
    let price = parseFloat(priceString.substring(1, priceString.length-1));
    let quantity = parseFloat(tableRows[i].getElementsByTagName("input")[0].value);
    sum += price * quantity;
  }
  sum = sum.toFixed(2);
  document.getElementById("total").innerHTML = sum;
}

function checkoutToggle() {
  let orderTableDiv = document.getElementById("order-table-div");
  let subtotal = parseFloat(document.getElementById("total").innerText);
  let checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton == null) {
    if (subtotal > 0) {
      checkoutButton = document.createElement("html");
      checkoutButton.innerHTML = "<button type=\"button\" class=\"btn btn-success ml-2 mb-2 mt-2\" id=\"checkout-button\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">Checkout</button>";
      orderTableDiv.append(checkoutButton.firstElementChild);
    }
  }
  else {
    if (subtotal <= 0) {
      orderTableDiv.removeChild(checkoutButton);
    }
  }
}

function placeOrderListener() {
  let tableRows = document.getElementById("cart").children;
  let productQuants = []
  for (let i = 1; i < tableRows.length; i++) {
    let quantityTag = tableRows[i].getElementsByClassName("form-control text-center")[0];
    let productNameTag = tableRows[i].getElementsByClassName("pt-3-half basket-row-product-name")[0];
    let productPriceTag = tableRows[i].getElementsByClassName("pt-3-half basket-row-product-price")[0];
    let classSplit = tableRows[i].className.split("-");
    let orderObj = {
      productId: classSplit[classSplit.length - 1],
      productName: productNameTag.innerText,
      productPrice: productPriceTag.innerText,
      quantity: quantityTag.value
    };
    productQuants.push(orderObj);
  }
  let customerDetails = {
    firstName: document.querySelector('input[name="firstName"]').value,
    surname: document.querySelector('input[name="surname"]').value,
    email: document.querySelector('input[name="email"]').value,
    addr1: document.querySelector('input[name="address-line1"]').value,
    addr2: document.querySelector('input[name="address-line2"]').value,
    county: document.querySelector('input[name="address-county"]').value,
    town: document.querySelector('input[name="address-town"]').value,
    postcode: document.querySelector('input[name="address-postcode"]').value
  };
  let orderDetails = {
    productQuants: productQuants,
    customerDetails: customerDetails,
    total: document.getElementById("total").innerHTML
  };
  let q = new XMLHttpRequest();
  q.onreadystatechange = displayOrderConfirmation;
  q.open("POST", '/products/submit_order', true);
  q.send(JSON.stringify(orderDetails));
}

function displayOrderConfirmation() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  let modalDiv = document.getElementById("modal-content");
  let modalContentsDiv = document.getElementById("modal-body");
  let modalFooterDiv = document.getElementById("modal-footer");
  let modalHeaderDiv = document.getElementById("modal-header");
  modalHeaderDiv.innerHTML = '<h5 class="modal-title" id="exampleModalLongTitle">Order Complete</h5><p><a class="btn btn-block btn-success" href="/products" role="button">Continue</a></p>';
  modalDiv.removeChild(modalFooterDiv);
  modalContentsDiv.innerHTML = this.responseText;

  let table = document.getElementById("cart");
  for (let i = 1; i < table.children.length; i++) {
    table.removeChild(table.children[i]);
  }
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

function validation() {
  let check = document.getElementById("check-valid");
  let valid = check.checkValidity();
  if(valid) {
    placeOrderListener();
  }
  return false;
}
