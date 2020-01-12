function fillCheckoutPopupBody(checkoutPopupBodyLayout) {
  let rowLayout = getHTML('components/checkout_basket_row.html');
  let checkoutPopupBodyDiv = checkoutPopupBodyLayout.cloneNode(true);
  let basketOverviewDiv = checkoutPopupBodyDiv.querySelector("#basket-overview");
  let basketContents = document.getElementById("basket-contents");
  for(let i = 0; i < basketContents.childNodes.length; i++) {
    let basRowProductIdInput = basketContents.childNodes[i].querySelector(".product-id");
    let basRowProductNameDiv = basketContents.childNodes[i].querySelector(".product-name");
    let basRowImageNameInput = basketContents.childNodes[i].querySelector(".product-image-name");
    let basRowProductQuantityInput = basketContents.childNodes[i].querySelector("input[name='product-quantity']");
    let basRowTotalPriceSpan = basketContents.childNodes[i].querySelector(".product-total-price span");

    rowLayout.then(res => {
      rowDiv = res.cloneNode(true);
      let checkRowImage = rowDiv.querySelector(".checkout-product-image img");
      checkRowImage.src = basRowImageNameInput.innerText;

      let checkRowQuant = rowDiv.querySelector(".checkout-product-quantity span");
      checkRowQuant.innerText = parseInt(basRowProductQuantityInput.value);

      let checkRowName = rowDiv.querySelector(".checkout-product-name");
      checkRowName.innerText = basRowProductNameDiv.innerText;

      let checkRowTotalPriceSpan = rowDiv.querySelector(".checkout-product-total-price span");
      checkRowTotalPriceSpan.innerText = basRowTotalPriceSpan.innerText;

      basketOverviewDiv.append(rowDiv);
    })
  }
  console.log(checkoutPopupBodyDiv);
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

function addCheckoutButtonEventListener(checkoutButton, checkoutPopupBodyLayout, popupLayout) {
  let bodyTag = document.getElementsByTagName("body")[0];
  checkoutButton.addEventListener("click", function () {
    let popupBodyContents = fillCheckoutPopupBody(checkoutPopupBodyLayout);
    let popupDiv = createCheckoutPopup(popupLayout, popupBodyContents);
    popupDiv = assignClosePopupListener(popupDiv);
    bodyTag.appendChild(popupDiv);
  });
}
