function fillCheckoutPopupBody(res, checkoutPopupBodyLayout) {
  let rowLayout = getHTML('components/checkout_basket_row.html');
  let checkoutPopupBodyDiv = checkoutPopupBodyLayout.cloneNode(true);
  let basketOverviewDiv = checkoutPopupBodyDiv.querySelector("#basket-overview-container");
  let basketContents = document.getElementById("basket-contents");
  for(let i = 0; i < res.prodBreakdown.length; i++) {
    rowLayout.then(row => {
      rowDiv = row.cloneNode(true);
      let checkRowImage = rowDiv.querySelector(".checkout-product-image img");
      checkRowImage.src = res.prodBreakdown[i].image_name;

      let checkRowQuant = rowDiv.querySelector(".checkout-product-quantity span");
      checkRowQuant.innerText = parseInt(res.prodBreakdown[i].quantity);

      let checkRowName = rowDiv.querySelector(".checkout-product-name");
      checkRowName.innerText = res.prodBreakdown[i].name;

      let checkRowTotalPriceSpan = rowDiv.querySelector(".checkout-product-total-price span");
      checkRowTotalPriceSpan.innerText = priceToString(res.prodBreakdown[i].totalPrice);

      basketOverviewDiv.append(rowDiv);
    });
  }

  let basketTotalPriceSpan = document.querySelector("#total-amount-container .amount span");
  let checkoutTotalPriceSpan = checkoutPopupBodyDiv.querySelector("#checkout-total-amount-container span");
  checkoutTotalPriceSpan.innerText = basketTotalPriceSpan.innerText;

  checkoutPopupBodyDiv = addPayButtonEventListeners(checkoutPopupBodyDiv);
  return checkoutPopupBodyDiv;
}

function fillIniationFailPopupBody(res, failPopupLayout) {
  let failDiv = failPopupLayout.cloneNode(true);
  let reasonsDiv = failDiv.querySelector("#initiate-failure-reasons");
  for(let i = 0; i < res.nameMis.length; i++) {
    let reason = document.createElement("li");
    reason.innerText = "The product you ordered, " + res.nameMis[i].wrongValue + ", has changed its name in our database to " + res.nameMis[i].productName + ".";
    reasonsDiv.appendChild(reason);
  }
  for(let i = 0; i < res.stockMis.length; i++) {
    let reason = document.createElement("li");
    reason.innerText = "You ordered " + res.stockMis[i].wrongValue + " units of " + res.stockMis[i].productName + " but there are only " + res.rightValue + "available.";
    reasonsDiv.appendChild(reason);
  }
  for(let i = 0; i < res.priceMis.length; i++) {
    let reason = document.createElement("li");
    reason.innerText = "The product you ordered, " + res.priceMis[i].productName + ", has changed price from £" + priceToString(res.priceMis[i].wrongValue) + " to " + priceToString(res.priceMis[i].rightValue) + ".";
    reasonsDiv.appendChild(reason);
  }
  return failDiv;
}

function createCheckoutPopup(popupLayout, popupBodyContents) {
  let popupDiv = popupLayout.cloneNode(true);
  let popupHeading = popupDiv.querySelector("#popup-title h4");
  let popupBody = popupDiv.querySelector("#popup-body");
  popupHeading.innerText = "Checkout";
  popupBody.appendChild(popupBodyContents);
  return popupDiv;
}

function addCheckoutButtonEventListener(checkoutButton, checkoutPopupBodyLayout, popupLayout) {
  let bodyTag = document.getElementsByTagName("body")[0];
  checkoutButton.addEventListener("click", function () {
    let popupBodyContents;
    let popupDiv;
    let order = extractOrder();
    postJSON('orders/initiate_order', order).then(res => {
      if(res.success) {
        popupBodyContents = fillCheckoutPopupBody(res, checkoutPopupBodyLayout);
        popupDiv = createCheckoutPopup(popupLayout, popupBodyContents);
        popupDiv = assignClosePopupListener(popupDiv);
        bodyTag.appendChild(popupDiv);
        // ensure that if user closes popup or leaves web page then database items are deleted
        // or delete all items that have had status 'initiated' for more than five minutes
      }
      else {
        getHTML('components/initiate_fail.html').then(failPopupLayout => {
          popupBodyContents = fillIniationFailPopupBody(res, failPopupLayout);
          popupDiv = createCheckoutPopup(popupLayout, popupBodyContents);
          popupDiv = assignClosePopupRefreshListener(popupDiv);
          bodyTag.appendChild(popupDiv);
        });
      }
    });
  });
}

function extractOrder() {
  let order = {
    productBreakdown: []
  };
  let basketContents = document.getElementById("basket-contents");
  for(let i = 0; i < basketContents.childNodes.length; i++) {
    let basRowProductIdInput = basketContents.childNodes[i].querySelector(".product-id");
    let basRowProductNameDiv = basketContents.childNodes[i].querySelector(".product-name");
    let basRowProductQuantityInput = basketContents.childNodes[i].querySelector("input[name='product-quantity']");
    let basRowTotalPriceSpan = basketContents.childNodes[i].querySelector(".product-total-price span");
    let productOrder = {
      id: parseInt(basRowProductIdInput.innerText),
      name: basRowProductNameDiv.innerText,
      quantity: basRowProductQuantityInput.value,
      totalPrice: parseFloat(basRowTotalPriceSpan.innerText)
    };
    order.productBreakdown.push(productOrder);
  }
  return order;
}
