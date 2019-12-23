let productLayout;
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

    ul.append(productDiv);
  }
}

function overlayEffects(productDiv, status) {
  if (status == 0 || status == 1) {
    productDiv.classList.add("NA");
  }
  let overlay = productDiv.querySelector(".overlay");
  let picture = productDiv.querySelector("img");
  productDiv.addEventListener("mouseenter", function() {
    if (productDiv.classList.contains("animationEnd")) {
      productDiv.classList.add("mouseOn");
      productDiv.classList.remove("mouseOff");
      productDiv.classList.remove("awaitAnimationEndMouseOff");
    }
    else {
      productDiv.classList.add("awaitAnimationEndMouseOn");
    }
  });
  productDiv.addEventListener("mouseleave", function() {
    if (productDiv.classList.contains("animationEnd")) {
      productDiv.classList.add("mouseOff");
      productDiv.classList.remove("mouseOn");
      productDiv.classList.remove("awaitAnimationEndMouseOn");
    }
    else {
      productDiv.classList.add("awaitAnimationEndMouseOff");
    }
  });
  productDiv.addEventListener("animationstart", function() {
    productDiv.classList.remove("animationEnd");
  });
  productDiv.addEventListener("animationend", function() {
    productDiv.classList.add("animationEnd");
    if (productDiv.classList.contains("awaitAnimationEndMouseOn")) {
      productDiv.classList.add("mouseOn");
      productDiv.classList.remove("mouseOff");
      productDiv.classList.remove("awaitAnimationEndMouseOn");
    }
    if (productDiv.classList.contains("awaitAnimationEndMouseOff")) {
      productDiv.classList.add("mouseOff");
      productDiv.classList.remove("mouseOn");
      productDiv.classList.remove("awaitAnimationEndMouseOff");
    }
  });
  return productDiv;
}
