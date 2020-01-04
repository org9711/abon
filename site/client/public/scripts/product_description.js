function popupFill(productDiv, product, popupLayout, productDescriptionPopupLayout) {
  let popupDiv = popupLayout.cloneNode(true);
  let popupHeading = popupDiv.querySelector("#popup-title h4");
  let popupBody = popupDiv.querySelector("#popup-body");
  let popupBodyContents = productDescriptionPopupLayout.cloneNode(true);
  let pricePlace = popupBodyContents.querySelector("#popup-product-price span");
  let descriptionPlace = popupBodyContents.querySelector("#popup-product-description p");
  popupHeading.innerText = product.name;
  pricePlace.innerText = priceToString(product.price);
  descriptionPlace.innerText = product.description;
  popupBody.appendChild(popupBodyContents);
  let infoButton = productDiv.querySelector(".info");
  let bodyTag = document.getElementsByTagName("body")[0];
  infoButton.addEventListener("click", function () {
    let popupDivClone = popupDiv.cloneNode(true);
    popupDivClone = assignClosePopupListener(popupDivClone);
    bodyTag.appendChild(popupDivClone);
  });
}

function priceToString(price) {
  let priceString = price.toString();
  if(priceString.includes(".")) {
    let integer = priceString.split(".")[0];
    let decimal = priceString.split(".")[1];
    decimal += '00';
    decimal = decimal.substring(0,2);
    priceString = integer + "." + decimal;
  }
  else {
    priceString += '.00';
  }
  return priceString;
}
