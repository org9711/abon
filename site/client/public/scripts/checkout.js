function createCheckoutPopup(popupLayout, checkoutPopupLayout) {
  return Promise.all([popupLayout, checkoutPopupLayout]).then((checkPopRes) => {
    let popupDiv = checkPopRes[0].cloneNode(true);
    let popupBodyContents = checkPopRes[1].cloneNode(true);
    let popupHeading = popupDiv.querySelector("#popup-title h4");
    let popupBody = popupDiv.querySelector("#popup-body");
    popupHeading.innerText = "Checkout";
    popupBody.appendChild(popupBodyContents);
    return popupDiv;
  });
}

function fillCheckoutPopup(div) {
  let basketContents = document.getElementById("basket-contents");
  let match = true;

  let allRowsJSON = {
    unitOrders: []
  };

  for(let i = 0; i < basketContents.childNodes.length; i++) {
    let rowProductIdInput = basketContents.childNodes[i].querySelector("input[name='product-id']");
    let rowProductId = parseInt(rowProductIdInput.value);

    let rowProductQuantityInput = basketContents.childNodes[i].querySelector("input[name='product-quantity']");
    let rowProductQuantity = parseInt(rowProductQuantityInput.value);

    let rowTotalPriceSpan = basketContents.childNodes[i].querySelector(".product-total-price span");
    let rowTotalPrice = parseFloat(rowTotalPriceSpan.innerText);

    let rowJSON = {
      id: rowProductId,
      quantity: rowProductQuantity,
      totalPrice: rowTotalPrice
    };
    allRowsJSON['unitOrders'].push(rowJSON);

    postJSON('/basket/check_basket', rowJSON).then(res => {
      console.log(res);
    });
  }
  // Make request to check if all products are still avaialble
  // if they are, send back id, product image, quantity of order product name and total price for each product
  // then construct the checkout with this information
  // if they aren't send back a message informing of the differences and to click the x and try again
  return div;
}

function createCheckoutButton() {
  return new Promise(function(resolve, reject) {
    let checkoutButton = document.createElement("button");
    checkoutButton.innerText = "Checkout";
    checkoutButton.classList.add("checkout-button");
    checkoutButton.classList.add("long-button");
    resolve(checkoutButton);
  });
}

function addCheckoutButtonEventListeners(checkoutButton, popupDiv, products) {
  let bodyTag = document.getElementsByTagName("body")[0]
  checkoutButton.addEventListener("click", function () {
    let popupDivClone = popupDiv.cloneNode(true);
    popupDivClone = fillCheckoutPopup(popupDivClone, products);
    // popupDivClone = assignClosePopupListener(popupDivClone); - do this when we know the event of check
    bodyTag.appendChild(popupDivClone);
  });
}
