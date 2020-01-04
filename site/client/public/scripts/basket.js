function basketFill(productDiv, product, basketRowLayout) {
  let basketRow = basketRowLayout.cloneNode(true);
  let basketButton = productDiv.querySelector(".add");
  let basketContents = document.getElementById("basket-contents");
  basketButton.addEventListener("click", function () {
    console.log("button clicked");
    if(basketContents.querySelector("#basket-row-" + product.id)) {
      console.log("row already exists, please increment quantity");
    }
    else {
      console.log("row does not exist yet, please add row");
      if(basketContents.children.length == 0) {
        console.log("first basket row, add checkout button");
      }
      basketRow.id = "basket-row-" + product.id;
      basketContents.appendChild(basketRow);

    }
  });
}
