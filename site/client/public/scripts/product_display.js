function displayProducts(product, productLayout) {
  return new Promise(function(resolve, reject) {
    let productDiv = productLayout.cloneNode(true);

    let nameTag = productDiv.querySelector("div h3");
    let imageTag = productDiv.querySelector("div img");

    let basketButton = productDiv.querySelector(".add");

    if (product.status == "on_sale") {
      nameTag.textContent = product.name;
    }
    else if (product.status == "sold_out") {
      nameTag.textContent = "Sold Out"
      productDiv.classList.add("na");
      basketButton.parentNode.removeChild(basketButton);
    }
    else if (product.status == "coming_soon") {
      nameTag.textContent = "Coming Soon";
      productDiv.classList.add("na");
      basketButton.parentNode.removeChild(basketButton);
    }

    imageTag.src = product.image_name;
    productDiv.id = "product-no-" + product.id;
    productDiv = overlayEffects(productDiv, product.status);

    resolve(productDiv);
  });
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
