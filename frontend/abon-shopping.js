window.onload = function(){
    
    var myCart = document.getElementById("cart");
    
    document.getElementById("addSuperfood").onclick = function(){addToCart()};

    function addToCart(){
        var superfood = myCart.getElementsByClassName("superfood");
        
        if(superfood.length <= 0){
            myCart.innerHTML += '<li class="superfood list-group-item d-flex justify-content-between lh-condensed"><div><h6 class="my-0">Superfood Pesto</h6></div><span class="text-muted">$12</span></li>';
        }else{
            superfood.getElementsByClassName("text-muted").innerHTML += (superfood.length + 1).toString();
        }
    }
}