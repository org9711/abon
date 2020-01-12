function fillCheckoutPopupBody(checkoutPopupBodyLayout) {
  let checkoutPopupBodyDiv = checkoutPopupBodyLayout.cloneNode(true);
  return checkoutPopupBodyDiv;
}

function createCheckoutPopup(popupLayout, popupBodyContents) {
  let popupDiv = popupLayout.cloneNode(true);
  let popupHeading = popupDiv.querySelector("#popup-title h4");
  let popupBody = popupDiv.querySelector("#popup-body");
  popupHeading.innerText = "Checkout";
  popupBody.appendChild(popupBodyContents);
  return popupDiv;
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

function addCheckoutButtonEventListener(checkoutButton, checkoutPopupBodyLayout, popupLayout) {
  let bodyTag = document.getElementsByTagName("body")[0];
  checkoutButton.addEventListener("click", function () {
    let popupBodyContents = fillCheckoutPopupBody(checkoutPopupBodyLayout);
    let popupDiv = createCheckoutPopup(popupLayout, popupBodyContents);
    popupDiv = assignClosePopupListener(popupDiv);
    bodyTag.appendChild(popupDiv);
  });
}
