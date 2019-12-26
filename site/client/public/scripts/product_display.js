let productLayout;
let productDescriptionPopupLayout;
let basketButton = "<button class='add'><span class='basketEmoji'>&#x1F6D2;</span></button>";

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
  getProductDescriptionPopupLayout();
}

function getProductDescriptionPopupLayout() {
  let q = new XMLHttpRequest();
  q.onreadystatechange = storeProductDescriptionPopupLayout;
  q.open("GET", '/products/get_product_description_popup_layout', true);
  q.send();
}

function storeProductDescriptionPopupLayout() {
  if(this.readyState != XMLHttpRequest.DONE) return;
  el = document.createElement("html");
  el.innerHTML = this.responseText;
  productDescriptionPopupLayout = el;
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
  let ul = document.getElementById("products");

  for (let i = 0; i < products.length; i++) {
    let id = products[i].id;
    let name = products[i].name;
    let price = products[i].price;
    let imageName = products[i].image_name;
    let status = products[i].status;
    let description = products[i].description;

    let productDiv = productLayout.cloneNode(true);

    let nameTag = productDiv.querySelector("div h3");
    let imageTag = productDiv.querySelector("div img");

    if (status == 2) {
      nameTag.textContent = name;
      let buttonsTag = productDiv.querySelector(".buttons");
      let wrap = document.createElement("html");
      wrap.innerHTML = basketButton;
      buttonsTag.appendChild(wrap.firstElementChild);
    }
    else if (status == 1) {
      nameTag.textContent = "Sold Out"
    }
    else if (status == 0) {
      nameTag.textContent = "Coming Soon"
    }

    imageTag.src = imageName;

    productDiv = productDiv.firstElementChild;

    productDiv = overlayEffects(productDiv, status);

    productDiv = popupFill(productDiv, name, price, description);

    ul.append(productDiv);
  }
}

function overlayEffects(productDiv, status) {
  if (status == 0 || status == 1) {
    productDiv.classList.add("na");
  }
  let overlay = productDiv.querySelector(".overlay");
  let picture = productDiv.querySelector("img");
  productDiv.addEventListener("mouseenter", function() {
    if (productDiv.classList.contains("animation-end")) {
      productDiv.classList.add("mouse-on");
      productDiv.classList.remove("mouse-off");
      productDiv.classList.remove("await-animation-end_mouse-off");
    }
    else {
      productDiv.classList.add("await-animation-end_mouse-on");
    }
  });
  productDiv.addEventListener("mouseleave", function() {
    if (productDiv.classList.contains("animation-end")) {
      productDiv.classList.add("mouse-off");
      productDiv.classList.remove("mouse-on");
      productDiv.classList.remove("await-animation-end_mouse-on");
    }
    else {
      productDiv.classList.add("await-animation-end_mouse-off");
    }
  });
  productDiv.addEventListener("animationstart", function() {
    productDiv.classList.remove("animation-end");
  });
  productDiv.addEventListener("animationend", function() {
    productDiv.classList.add("animation-end");
    if (productDiv.classList.contains("await-animation-end_mouse-on")) {
      productDiv.classList.add("mouse-on");
      productDiv.classList.remove("mouse-off");
      productDiv.classList.remove("await-animation-end_mouse-on");
    }
    if (productDiv.classList.contains("await-animation-end_mouse-off")) {
      productDiv.classList.add("mouse-off");
      productDiv.classList.remove("mouse-on");
      productDiv.classList.remove("await-animation-end_mouse-off");
    }
  });
  return productDiv;
}

function popupFill(productDiv, name, price, description) {
  let popupDiv = popupLayout.cloneNode(true);
  let popupHeading = popupDiv.querySelector("#popup-title h4");
  let popupBody = popupDiv.querySelector("#popup-body");
  let popupBodyContents = productDescriptionPopupLayout.cloneNode(true);
  let pricePlace = popupBodyContents.querySelector("#popup-product-price span");
  let descriptionPlace = popupBodyContents.querySelector("#popup-product-description p");
  popupHeading.innerText = name;
  pricePlace.innerText = priceToString(price);
  descriptionPlace.innerText = description;
  popupBody.appendChild(popupBodyContents);
  let infoButton = productDiv.querySelector(".info");
  let bodyTag = document.getElementsByTagName("body")[0];
  infoButton.addEventListener("click", function () {
    let popupDivClone = popupDiv.cloneNode(true);
    popupDivClone = assignClosePopupListener(popupDivClone);
    bodyTag.appendChild(popupDivClone.firstElementChild);
  });
  return productDiv;
}

function priceToString(price) {
  let priceString = price.toString();
  console.log(price, priceString, priceString.split(".")[1].length);
  for (i = 0; i < price.toString().split(".")[1].length; i++) {
    priceString += '0';
    console.log(priceString);
  }
  return priceString;
}
