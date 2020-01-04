function basketFill(productDiv, product, basketRowLayout) {
  let basketButton = productDiv.querySelector(".add");
  let basketContents = document.getElementById("basket-contents");
  basketButton.addEventListener("click", function () {
    let basketRow = basketContents.querySelector("#basket-row-" + product.id);
    if(basketRow) {
      incrementQuantity(basketRow, product.price);
    }
    else {
      basketRow = basketRowLayout.cloneNode(true);
      if(basketContents.children.length == 0) {
        console.log("first basket row, add checkout button");
        let headingWiggle = document.getElementById("heading-wiggle");
        headingWiggle.classList.remove("hide");
      }
      basketRow.id = "basket-row-" + product.id;
      let productNameDiv = basketRow.querySelector(".product-name");
      let productPriceSpan = basketRow.querySelector(".product-unit-price span");
      productNameDiv.innerText = product.name;
      productPriceSpan.innerText = priceToString(product.price);
      calculateProductTotalPrice(basketRow, product.price);
      addIncrementDecrementEventListerners(basketRow, product.price);
      basketContents.appendChild(basketRow);
    }
  });
}

function calculateProductTotalPrice(basketRow, price) {
  let quantityEl = basketRow.querySelector(".product-quantity");
  let quantity = parseInt(quantityEl.value);

  let productTotalPriceSpan = basketRow.querySelector(".product-total-price span");
  console.log(price + " * " + quantity + " = " + priceToString(price * quantity));
  productTotalPriceSpan.innerText = priceToString(price * quantity);
}

function addIncrementDecrementEventListerners(basketRow, price) {
  let decrementButton = basketRow.querySelector(".decrement");
  let incrementButton = basketRow.querySelector(".increment");
  decrementButton.addEventListener("click", function(){decrementQuantity(basketRow, price)});
  incrementButton.addEventListener("click", function(){incrementQuantity(basketRow, price)});
}

function incrementQuantity(basketRow, price) {
  let quantity = basketRow.querySelector(".product-quantity");
  let oldQuantity = parseInt(quantity.value);
  if(oldQuantity < 9) {
    quantity.value = oldQuantity + 1;
    calculateProductTotalPrice(basketRow, price);
  }
}

function decrementQuantity(basketRow, price) {
  let quantityEl = basketRow.querySelector(".product-quantity");
  let oldQuantity = parseInt(quantityEl.value);
  if(oldQuantity == 1) {
    basketRow.parentNode.removeChild(basketRow);
    let basketContents = document.getElementById("basket-contents");
    if(basketContents.children.length == 0) {
      console.log("last basket removed, please remove checkout button");
      let headingWiggle = document.getElementById("heading-wiggle");
      headingWiggle.classList.add("hide");
    }
  }
  else {
    quantityEl.value = oldQuantity - 1;
    calculateProductTotalPrice(basketRow, price);
  }
}
