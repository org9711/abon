function addBurgerAnimation() {
  var burgerMenu = document.getElementById('burger');
  burgerMenu.addEventListener("click", function() {
    toggleAnimation(burgerMenu);
  });
}


function toggleAnimation(animation) {
  animation.classList.toggle("change");
}
