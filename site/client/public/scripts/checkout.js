function createCheckoutPopup(popupLayout, popupBodyContents) {
  let popupDiv = popupLayout.cloneNode(true);
  let popupHeading = popupDiv.querySelector("#popup-title h4");
  let popupBody = popupDiv.querySelector("#popup-body");
  popupHeading.innerText = "Checkout";
  popupBody.appendChild(popupBodyContents);
  return popupDiv;
}

function fillCheckoutPopupBody(popupLayout, checkoutPopupBodyLayout) {
  let popupBodyDiv;
  let popupDiv;
  let basketContents = document.getElementById("basket-contents");

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
  }

  return postJSON('/basket/check_basket', allRowsJSON).then(res => {
    if(res["match"]) {
      popupBodyDiv = checkoutPopupBodyLayout.cloneNode(true);
      popupDiv = createCheckoutPopup(popupLayout, popupBodyDiv);
      popupDiv = assignClosePopupListener(popupDiv);
    }
    else {
      popupBodyDiv = createNoMatchDiv(res);
      popupDiv = createCheckoutPopup(popupLayout, popupBodyDiv);
      popupDiv.classList.remove("checkout");
      popupDiv = assignClosePopupRefreshListener(popupDiv);
    }
    return popupDiv;
  });
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

function addCheckoutButtonEventListeners(checkoutButton, popupLayout, checkoutPopupBodyLayout) {
  let bodyTag = document.getElementsByTagName("body")[0];
  checkoutButton.addEventListener("click", function () {
    fillCheckoutPopupBody(popupLayout, checkoutPopupBodyLayout)
      .then(res => bodyTag.appendChild(res));
  });
}

function createNoMatchDiv(res) {
  let popupBodyDiv = document.createElement("div");
  popupBodyDiv.id = "popup-body-container";
  let intro = document.createElement("p");
  intro.innerText = "Sorry! It appears that something has changed since you loaded the page. See below:";
  popupBodyDiv.appendChild(intro);
  for(let i = 0; i < res.info.length; i++) {
    let mismatch = document.createElement("li");
    mismatch.innerText = "hello " + i;
    popupBodyDiv.appendChild(mismatch)
  }
  let outro = document.createElement("p");
  outro.innerText = "Please close this popup to use updated information and order."
  return popupBodyDiv;
}
