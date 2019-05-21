var myCart = document.getElementById("cart");

var tableRows = myCart.children;
var sum = 0;

for(int i = 1; i < tableRows.length; i++){
    var price = tableRows[i].getElementsByClassName("pt-3-half price").innerHTML;
    var quantity = tableRows[i].getElementsByTagName("input").value;
    sum = price * quantity;
    console.log(sum);
}