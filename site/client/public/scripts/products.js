addEventListener('load', start);

function start() {
  displayHeader();
  displayFooter();
  addDynamicContent();
  animateWigglies();
}

function addDynamicContent() {
  let ul = document.getElementById("products");

  let productsReq = getJSON('/products/get_products');

  productsReq.then((products) => {
    let popupLayout = getHTML('/frame/get_popup_layout');
    let productDescriptionPopupLayout = getHTML('/products/get_product_description_popup_layout');
    let basketRowLayout = getHTML('/products/get_basket_row_layout');
    getHTML('/products/get_product_layout')
      .then(productLayout => {
        for(let i = 0; i < products.length; i++) {
          displayProducts(products[i], productLayout)
          .then(div => {
            ul.appendChild(div);
            Promise.all([popupLayout, productDescriptionPopupLayout])
            .then((popRes) => {
              popupFill(div, products[i], popRes[0], popRes[1]);
            });
            if(div.querySelector(".add")) {
              basketRowLayout.then(basRes => {
                basketFill(div, products[i], basRes);
              });
            }
        });
      }
    });
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
