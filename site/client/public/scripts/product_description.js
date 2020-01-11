function popupProductDescriptionFill(productDiv, product, popupLayout, productDescriptionPopupLayout) {
  let popupDiv = popupLayout.cloneNode(true);
  let popupBodyContents = productDescriptionPopupLayout.cloneNode(true);
  let popupHeading = popupDiv.querySelector("#popup-title h4");
  let popupBody = popupDiv.querySelector("#popup-body");
  let pricePlace = popupBodyContents.querySelector("#popup-product-price");
  let stockPlace = popupBodyContents.querySelector("#popup-product-stock");
  let descriptionPlace = popupBodyContents.querySelector("#popup-product-description p");
  popupHeading.innerText = product.name;
  let productStockNumber = parseInt(product.stock);
  let productStockString = productStockNumber.toString() + " units";
  if(productStockNumber == 10) {
    productStockString = "9+ units";
  }
  if(product.status == 0) {
    productStockString = "Coming Soon"
  }
  if(product.status == 1) {
    productStockString = "Out of Stock"
  }
  pricePlace.innerText = priceToString(product.price);
  stockPlace.innerText = productStockString;
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
