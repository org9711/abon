window.onload = function(){
    
    var myCart = document.getElementById("cart");
    
    document.getElementById("addSuperfoodPesto").addEventListener("click", function(){
        var meal = myCart.getElementsByClassName("superfood");
        
        if(meal.length <= 0){
            myCart.innerHTML += '<tr class="superfood"><td class="pt-3-half">Superfood Pesto</td><td class="pt-3-half">2.20</td><td id="pesto-quantity" class="pt-3-half" contenteditable="true">1</td><td><button type="button" id="removeBtn" class="btn btn-danger btn-rounded removeBtn btn-sm my-0">Remove</button></span></td></tr>';
        }else{
            var pQuantity = document.getElementById("pesto-quantity");
            var q = parseInt(pQuantity.innerHTML) + 1;
//            superfood.childNodes[2].innerHTML = quantity.toString();
//            quantity.innerHTML += (superfood.length + 1).toString();
            pQuantity.innerHTML = q;
        }
        
        document.getElementById("removeBtn").addEventListener("click", function(){
//        alert("remove button pressed");
        this.parentElement.parentElement.remove();
        });
        
    });
    
    document.getElementById("addVegCurry").addEventListener("click", function(){
        var meal = myCart.getElementsByClassName("roastVeg");
        
        if(meal.length <= 0){
            myCart.innerHTML += '<tr class="roastVeg"><td class="pt-3-half">Roast Veg Curry</td><td class="pt-3-half">2.20</td><td id="roastVeg-quantity" class="pt-3-half" contenteditable="true">1</td><td><button type="button" id="removeBtn" class="btn btn-danger btn-rounded btn-sm removeBtn my-0">Remove</button></td></tr>';
        }else{
            var pQuantity = document.getElementById("roastVeg-quantity");
            var q = parseInt(pQuantity.innerHTML) + 1;
//            superfood.childNodes[2].innerHTML = quantity.toString();
//            quantity.innerHTML += (superfood.length + 1).toString();
            pQuantity.innerHTML = q;
        }
        
        document.getElementById("removeBtn").addEventListener("click", function(){
//        alert("remove button pressed");
        this.parentElement.parentElement.remove();
        });
    });
    
    //remove button removes row
        
}