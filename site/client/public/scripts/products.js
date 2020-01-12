addEventListener('load', start);

function start() {
  displayHeader();
  displayFooter();
  addDynamicContent();
  animateWigglies();
}

function addDynamicContent() {
  let popupLayout = getHTML('/components/popup.html');
  let products = getJSON('/products/get_products');
  let productDescriptionPopupLayout = getHTML('/components/product_description_popup.html');
  let basketRowLayout = getHTML('/components/product_basket_row.html');
  let productLayout = getHTML('/components/product_tab.html');
  fillContent(products, productLayout, popupLayout, productDescriptionPopupLayout, basketRowLayout);
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

function fillContent(products, productLayout, popupLayout, productDescriptionPopupLayout, basketRowLayout) {
  let ul = document.getElementById("products");

  Promise.all([products, productLayout]).then((prodRes) => {
    for(let i = 0; i < prodRes[0].length; i++) {
      displayProducts(prodRes[0][i], prodRes[1]).then(div => {
        ul.appendChild(div);

        Promise.all([popupLayout, productDescriptionPopupLayout]).then((prodPopRes) => {
          popupProductDescriptionFill(div, prodRes[0][i], prodPopRes[0], prodPopRes[1]);
        });

        if(div.querySelector(".add")) {
          Promise.all([basketRowLayout, popupLayout]).then((basRes) => {
            basketFill(div, prodRes[0][i], basRes[0], basRes[1]);
          });
        }
      });
    }
  });
}
