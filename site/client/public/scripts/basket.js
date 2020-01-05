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
        let totalAmountContainer = document.getElementById("total-amount-container");
        totalAmountContainer.classList.remove("hide");
      }
      basketRow.id = "basket-row-" + product.id;
      let productNameDiv = basketRow.querySelector(".product-name");
      let productPriceSpan = basketRow.querySelector(".product-unit-price span");
      productNameDiv.innerText = product.name;
      productPriceSpan.innerText = priceToString(product.price);
      addIncrementDecrementEventListerners(basketRow, product.price);
      basketContents.appendChild(basketRow);
      reinsertProductTotalPrice(basketRow, product.price);
      reinsertOverallPrice();
    }
  });
}

function reinsertProductTotalPrice(basketRow, price) {
  let quantityEl = basketRow.querySelector(".product-quantity");
  let quantity = parseInt(quantityEl.value);

  let productTotalPriceSpan = basketRow.querySelector(".product-total-price span");
  productTotalPriceSpan.innerText = priceToString(price * quantity);
}

function reinsertOverallPrice() {
  let basketContents = document.getElementById("basket-contents");
  let total = 0;
  for(let i = 0; i < basketContents.childNodes.length; i++) {
    let productPriceSpan = basketContents.childNodes[i].querySelector(".product-total-price span");
    let price = parseFloat(productPriceSpan.innerText);
    total += price;
  }
  let totalPriceSpan = document.querySelector("#total-amount-container .amount span");
  totalPriceSpan.innerText = priceToString(total);
}

function addIncrementDecrementEventListerners(basketRow, price, basketContents) {
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
    reinsertProductTotalPrice(basketRow, price);
    reinsertOverallPrice();
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
      let totalAmountContainer = document.getElementById("total-amount-container");
      totalAmountContainer.classList.add("hide");
    }
  }
  else {
    quantityEl.value = oldQuantity - 1;
    reinsertProductTotalPrice(basketRow, price);
  }
  reinsertOverallPrice();
}
