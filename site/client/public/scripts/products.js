addEventListener('load', start);

function start() {
  displayHeader();
  displayFooter();
  addDynamicContent();
  animateWigglies();
}

function addDynamicContent() {
  let popupLayout = getHTML('/frame/get_popup_layout');
  let products = getJSON('/products/get_products');
  let productDescriptionPopupLayout = getHTML('/products/get_product_description_popup_layout');
  let basketRowLayout = getHTML('/basket/get_basket_row_layout');
  let productLayout = getHTML('/products/get_product_layout');
  let checkoutPopupBodyLayout = getHTML('/checkout/get_checkout_popup_layout');
  let checkoutButtonLayout = createCheckoutButton();
  let checkoutPopupLayout = createCheckoutPopup(popupLayout, checkoutPopupBodyLayout);
  fillContent(products, productLayout, popupLayout, productDescriptionPopupLayout, basketRowLayout, checkoutButtonLayout, checkoutPopupLayout);
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

function fillContent(products, productLayout, popupLayout, productDescriptionPopupLayout, basketRowLayout, checkoutButtonLayout, checkoutPopupLayout) {
  let ul = document.getElementById("products");

  Promise.all([products, productLayout]).then((prodRes) => {
    for(let i = 0; i < prodRes[0].length; i++) {
      displayProducts(prodRes[0][i], prodRes[1]).then(div => {
        ul.appendChild(div);

        Promise.all([popupLayout, productDescriptionPopupLayout]).then((prodPopRes) => {
          popupProductDescriptionFill(div, prodRes[0][i], prodPopRes[0], prodPopRes[1]);
        });

        if(div.querySelector(".add")) {
          Promise.all([basketRowLayout, checkoutButtonLayout, checkoutPopupLayout]).then((basRes) => {
            basketFill(div, prodRes[0][i], basRes[0], basRes[1], basRes[2]);
          });
        }
      });
    }
  });
}
