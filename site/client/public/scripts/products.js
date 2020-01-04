addEventListener('load', start);


function start() {
  displayHeader();
  displayFooter();
  addDynamicContent();

}

function addDynamicContent() {
  let ul = document.getElementById("products");

  let products = getJSON('/products/get_products');
  let productLayout = getHTML('/products/get_product_layout');

  Promise.all([products, productLayout])
  .then((prodRes) => {
    let popupLayout = getHTML('/frame/get_popup_layout');
    let productDescriptionPopupLayout = getHTML('/products/get_product_description_popup_layout');
    for(let i = 0; i < prodRes[0].length; i++) {
      displayProducts(prodRes[0][i], prodRes[1])
        .then(div => {
          Promise.all([popupLayout, productDescriptionPopupLayout])
            .then((popRes) => {
              popupFill(div, prodRes[0][i], popRes[0], popRes[1]);
              ul.appendChild(div);
            });
        });
    }
  });
}
