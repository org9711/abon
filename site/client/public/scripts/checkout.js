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
  console.log("1");
}

function bla(div) {
  console.log("2")
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

function addCheckoutButtonEventListeners(checkoutButton, popupDiv) {
  let bodyTag = document.getElementsByTagName("body")[0]
  checkoutButton.addEventListener("click", function () {
    let popupDivClone = popupDiv.cloneNode(true);
    popupDivClone = assignClosePopupListener(popupDivClone);
    bodyTag.appendChild(popupDivClone);
  });
}
